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

import { expect, test } from '@playwright/test';
import { GetDbClusterPayload } from '../../../../types/dbCluster.types';
import { basicInformationStepCheck } from './steps/basic-information-step';
import { resourcesStepCheck } from './steps/resources-step';
import { advancedConfigurationStepCheck } from './steps/advanced-configuration-step';
import { backupsStepCheck } from './steps/backups-step';
import { getK8sClusters } from '../../utils/k8s-clusters';
import { getEnginesVersions } from '../../utils/database-engines';
import { getClusterDetailedInfo } from '../../utils/storage-class';

test.describe('DB Cluster creation', () => {
  let kubernetesId;
  let engineVersions = {
    pxc: [],
    psmdb: [],
    postgresql: [],
  };
  let storageClasses = [];
  // let monitoringInstancesList = [];

  test.beforeAll(async ({ request }) => {
    const kuberneteslist = await getK8sClusters(request);
    kubernetesId = kuberneteslist[0].id;
    engineVersions = await getEnginesVersions(request, kubernetesId);

    const { storageClassNames = [] } = await getClusterDetailedInfo(
      request,
      kubernetesId
    );
    storageClasses = storageClassNames;

    // monitoringInstancesList = await getMonitoringInstanceList(request);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/databases/new');
    await page.getByTestId('toggle-button-group-input-db-type').waitFor();
    await page.getByTestId('select-input-db-version').waitFor();
  });

  test('Cluster creation', async ({ page, request }) => {
    const clusterName = 'db-cluster-ui-test';

    expect(storageClasses.length).toBeGreaterThan(0);

    await basicInformationStepCheck(
      page,
      engineVersions,
      storageClasses,
      clusterName
    );
    await page.getByTestId('db-wizard-continue-button').click();

    await resourcesStepCheck(page);
    await page.getByTestId('db-wizard-continue-button').click();

    // TODO uncomment step tests inside function
    await backupsStepCheck();
    // await page.getByTestId('db-wizard-continue-button').click();

    await advancedConfigurationStepCheck(page);
    await page.getByTestId('db-wizard-continue-button').click();

    // await monitoringStepCheck(page, monitoringInstancesList);
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

    const deleteResponse = await request.delete(
      `/v1/kubernetes/${kubernetesId}/database-clusters/${addedCluster?.metadata.name}`
    );
    expect(deleteResponse.ok()).toBeTruthy();

    expect(addedCluster).not.toBeUndefined();
    expect(addedCluster?.spec.engine.type).toBe('psmdb');
    expect(addedCluster?.spec.engine.replicas).toBe(3);
    expect(addedCluster?.spec.engine.resources?.cpu.toString()).toBe('500m');
    expect(addedCluster?.spec.engine.resources?.memory.toString()).toBe('32G');
    expect(addedCluster?.spec.engine.storage.size.toString()).toBe('150G');
    expect(addedCluster?.spec.proxy.expose.type).toBe('external');
    expect(addedCluster?.spec.proxy.replicas).toBe(3);
    expect(addedCluster?.spec.proxy.expose.ipSourceRanges).toEqual([
      '192.168.1.1/24',
      '192.168.1.0',
    ]);
    expect(addedCluster?.spec.engine.storage.class).toBe(storageClasses[0]);
  });

  test('Cancel wizard', async ({ page }) => {
    await page.getByTestId('mongodb-toggle-button').click();
    await page.getByTestId('text-input-db-name').fill('new-cluster');
    await page.getByTestId('text-input-storage-class').click();
    await page.getByRole('option').first().click();
    await page.getByTestId('db-wizard-continue-button').click();

    await expect(
      page.getByRole('heading', {
        name: 'Configure the resources your new database will have access to.',
      })
    ).toBeVisible();

    await page.getByTestId('toggle-button-nodes-3').click();
    await page.getByTestId('toggle-button-large').click();
    await page.getByTestId('text-input-disk').fill('150');
    await page.getByTestId('db-wizard-continue-button').click();

    // await expect(
    //   page.getByRole('heading', {
    //     name: 'Specify how often you want to run backup jobs for your database.',
    //   })
    // ).toBeVisible();
    //
    // await page.getByTestId('text-input-storage-location').click();
    //
    // const storageOptions = page.getByRole('option');
    //
    // expect(storageOptions.filter({ hasText: 'ui-dev' })).toBeVisible();
    // await storageOptions.first().click();
    //
    // await page.getByTestId('db-wizard-continue-button').click();

    await expect(
      page.getByRole('heading', { name: 'Advanced Configurations' })
    ).toBeVisible();

    await page.getByTestId('db-wizard-cancel-button').click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await page.getByText('Yes, cancel').click();

    await expect(page).toHaveURL('/databases');
  });
});
