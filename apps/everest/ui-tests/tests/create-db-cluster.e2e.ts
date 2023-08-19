// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { test, expect } from '@playwright/test';
import { GetDbClusterPayload } from '../../types/dbCluster.types';
import {
  createDbClusterPageIsReady,
  dbEnginesButtonsIsReady,
  EngineVersions,
} from './utils/createDbClusterForm';
import { getK8sClusters } from './utils/k8sClusters';
import { getEnginesVersions } from './utils/database-engines';

let kubernetesId;

let engineVersions: EngineVersions = {
  pxc: [],
  psmdb: [],
  postgresql: [],
};

test.beforeAll(async ({ request }) => {
  const k8sClusters = await getK8sClusters(request);
  kubernetesId = k8sClusters[0].id;
  engineVersions = await getEnginesVersions(request, kubernetesId);
});

test.beforeEach(async ({ page }) => {
  await createDbClusterPageIsReady(page);
});

test('Cluster creation', async ({ page, request }) => {
  const clusterName = 'db-cluster-ui-test';
  const dbEngines = await dbEnginesButtonsIsReady(page);
  const { psmdb: mongoButton } = dbEngines;

  await mongoButton.click();
  await page.getByTestId('select-db-version-button').click();

  const options = page.getByRole('option');

  engineVersions.psmdb.forEach((version) =>
    expect(
      options.filter({ hasText: new RegExp(`^${version}$`) })
    ).toBeVisible()
  );

  await page.getByRole('option').first().click();
  await page.getByTestId('text-input-db-name').fill(clusterName);
  await page.getByTestId('db-wizard-continue-button').click();

  await expect(
    page.getByRole('heading', {
      name: 'Configure the resources your new database will have access to.',
    })
  ).toBeVisible();
  await page.getByTestId('toggle-button-two-nodes').click();
  await page.getByTestId('toggle-button-large').click();
  await page.getByTestId('disk-input').fill('150');
  await page.getByTestId('db-wizard-continue-button').click();

  await expect(
    page.getByRole('heading', { name: 'External Access' })
  ).toBeVisible();
  await page.getByLabel('Enable External Access').check();
  expect(
    await page.getByLabel('Enable External Access').isChecked()
  ).toBeTruthy();
  await page.getByTestId('text-input-source-range').fill('192.168.1.1');
  page.pause();
  await page.getByTestId('db-wizard-submit-button').click();

  await expect(page.getByTestId('db-wizard-goto-db-clusters')).toBeVisible();

  const response = await request.get(
    `/v1/kubernetes/${kubernetesId}/database-clusters`
  );

  expect(response.ok()).toBeTruthy();
  // TODO replace with correct payload typings from GET DB Clusters
  const { items: clusters }: GetDbClusterPayload = await response.json();

  const addedCluster = clusters.find(
    (cluster) => cluster.metadata.name === clusterName
  );

  await page.goto('/databases');

  // cluster actions menu click
  (
    await page
      .locator('.MuiTableRow-root')
      .filter({ hasText: 'db-cluster-ui-test' })
      .getByTestId('MoreHorizIcon')
  ).click();

  const suspendAction = page.getByTestId('PauseCircleOutlineIcon');
  await suspendAction.click();
  await page.reload();

  const clusterRowAfterSuspend = await page
    .locator('.MuiTableRow-root')
    .filter({ hasText: 'db-cluster-ui-test' });

  await (await clusterRowAfterSuspend.getByTestId('MoreHorizIcon')).click();
  const resumeAction = page.getByTestId('PauseCircleOutlineIcon');
  await resumeAction.click();

  await page.reload();
  (
    await page
      .locator('.MuiTableRow-root')
      .filter({ hasText: 'db-cluster-ui-test' })
      .getByTestId('MoreHorizIcon')
  ).click();
  const restartAction = page.getByTestId('PlayArrowOutlinedIcon');
  await restartAction.click();

  await page.reload();
  (
    await page
      .locator('.MuiTableRow-root')
      .filter({ hasText: 'db-cluster-ui-test' })
      .getByTestId('MoreHorizIcon')
  ).click();
  const deleteAction = page.getByTestId('DeleteOutlineIcon');
  await deleteAction.click();

  await page.reload();
  expect(await page.getByText('db-cluster-ui-test').count()).toEqual(0);

  expect(addedCluster).not.toBeUndefined();
  expect(addedCluster?.spec.engine.type).toBe('psmdb');
  expect(addedCluster?.spec.engine.replicas).toBe(2);
  expect(addedCluster?.spec.engine.resources?.cpu.toString()).toBe('8');
  expect(addedCluster?.spec.engine.resources?.memory.toString()).toBe('32G');
  expect(addedCluster?.spec.engine.storage.size.toString()).toBe('150G');
  expect(addedCluster?.spec.proxy.expose.type).toBe('external');
  expect(addedCluster?.spec.proxy.replicas).toBe(2);
  expect(addedCluster?.spec.proxy.expose.ipSourceRanges).toEqual([
    '192.168.1.1',
  ]);
});

test('Cancel wizard', async ({ page }) => {
  await page.getByTestId('mongodb-toggle-button').click();
  await page.getByTestId('text-input-db-name').fill('new-cluster');
  await page.getByTestId('db-wizard-continue-button').click();

  await expect(
    page.getByRole('heading', {
      name: 'Configure the resources your new database will have access to.',
    })
  ).toBeVisible();

  await page.getByTestId('toggle-button-two-nodes').click();
  await page.getByTestId('toggle-button-large').click();
  await page.getByTestId('disk-input').fill('150');
  await page.getByTestId('db-wizard-continue-button').click();

  await expect(
    page.getByRole('heading', { name: 'External Access' })
  ).toBeVisible();

  await page.getByTestId('db-wizard-cancel-button').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByText('Yes, cancel').click();

  await expect(page).toHaveURL('/databases');
});
