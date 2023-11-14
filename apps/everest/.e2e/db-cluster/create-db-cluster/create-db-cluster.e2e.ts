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
import { getEnginesVersions } from '../../utils/database-engines';
import { getClusterDetailedInfo } from '../../utils/storage-class';
import { advancedConfigurationStepCheck } from './steps/advanced-configuration-step';
import { backupsStepCheck } from './steps/backups-step';
import { basicInformationStepCheck } from './steps/basic-information-step';
import { resourcesStepCheck } from './steps/resources-step';

test.describe('DB Cluster creation', () => {
  let engineVersions = {
    pxc: [],
    psmdb: [],
    postgresql: [],
  };
  let storageClasses = [];
  // let monitoringInstancesList = [];

  test.beforeAll(async ({ request }) => {
    engineVersions = await getEnginesVersions(request);

    const { storageClassNames = [] } = await getClusterDetailedInfo(request);
    storageClasses = storageClassNames;

    // monitoringInstancesList = await getMonitoringInstanceList(request);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/databases/new');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }

    await page.getByTestId('toggle-button-group-input-db-type').waitFor();
    await page.getByTestId('select-input-db-version').waitFor();
  });

  test.skip('Cluster creation with an incomplete list of DBEngines', () => {
    // TODO after the https://jira.percona.com/browse/EVEREST-203 is ready
    // 1) rewrite the starting pipeline of launching everest to launch everest without clusters
    // 2) add 2 clusters using new methods from EVEREST-203
    // 3) check that the default parameters for MySQL are changed with parameters for the first available dbEngine
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
    await expect(page.getByText('Number of nodes: 3')).toBeVisible();

    await resourcesStepCheck(page);
    await page.getByTestId('db-wizard-continue-button').click();

    // TODO uncomment step tests inside function
    await backupsStepCheck();
    // await page.getByTestId('db-wizard-continue-button').click();

    await advancedConfigurationStepCheck(page);
    await page.getByTestId('db-wizard-continue-button').click();

    // Test the mechanism for default number of nodes
    await page.getByTestId('button-edit-preview-basic-information').click();
    // Here we test that version wasn't reset to default
    await expect(page.getByText('Version: 5.0.7-6')).toBeVisible();
    await page.getByTestId('postgresql-toggle-button').click();
    await expect(page.getByText('Number of nodes: 2')).toBeVisible();
    // Now we change the number of nodes
    await page.getByTestId('button-edit-preview-resources').click();
    await page.getByTestId('toggle-button-nodes-3').click();
    await page.getByTestId('toggle-button-nodes-2').click();
    await page.getByTestId('button-edit-preview-basic-information').click();
    // Because 2 nodes is not valid for MongoDB, the default will be picked
    await page.getByTestId('mongodb-toggle-button').click();
    await expect(page.getByText('Number of nodes: 3')).toBeVisible();
    await page.getByTestId('button-edit-preview-monitoring').click();

    // await monitoringStepCheck(page, monitoringInstancesList);
    await page.getByTestId('db-wizard-submit-button').click();

    await expect(page.getByTestId('db-wizard-goto-db-clusters')).toBeVisible();
    await expect(
      page.getByText('Awesome! Your database is being created!')
    ).toBeVisible();

    const response = await request.get('/v1/database-clusters');

    expect(response.ok()).toBeTruthy();
    // TODO replace with correct payload typings from GET DB Clusters
    const { items: clusters } = await response.json();

    const addedCluster = clusters.find(
      (cluster) => cluster.metadata.name === clusterName
    );

    const deleteResponse = await request.delete(
      `/v1/database-clusters/${addedCluster?.metadata.name}`
    );
    expect(deleteResponse.ok()).toBeTruthy();

    expect(addedCluster).not.toBeUndefined();
    expect(addedCluster?.spec.engine.type).toBe('psmdb');
    expect(addedCluster?.spec.engine.replicas).toBe(3);
    expect(['600m', '0.6']).toContain(
      addedCluster?.spec.engine.resources?.cpu.toString()
    );
    expect(addedCluster?.spec.engine.resources?.memory.toString()).toBe('32G');
    expect(addedCluster?.spec.engine.storage.size.toString()).toBe('150G');
    expect(addedCluster?.spec.proxy.expose.type).toBe('internal');
    expect(addedCluster?.spec.proxy.replicas).toBe(3);
    // expect(addedCluster?.spec.proxy.expose.ipSourceRanges).toEqual([
    //   '192.168.1.1/24',
    //   '192.168.1.0',
    // ]);
    expect(addedCluster?.spec.engine.storage.class).toBe(storageClasses[0]);
  });

  test.skip('Cancel wizard', async ({ page }) => {
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