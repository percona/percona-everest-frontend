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
import { createDbClusterFn, deleteDbClusterFn } from '../utils/db-cluster';
import {
  findDbAndClickActions,
  findDbAndClickRow,
} from '../utils/db-clusters-list';
import { getTokenFromLocalStorage } from '../utils/localStorage';

test.describe('DB Cluster Restore to the new cluster', () => {
  const dbClusterName = 'mysql-restore-to-new';

  test.beforeEach(async ({ request, page }) => {
    await page.goto('/databases');
    const token = await getTokenFromLocalStorage();
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
    await createDbClusterFn(token, request, {
      dbName: dbClusterName,
      dbType: 'mysql',
      numberOfNodes: '1',
      backup: {
        enabled: true,
        schedules: [],
      },
    });
  });

  test.afterEach(async ({ request }) => {
    const token = await getTokenFromLocalStorage();
    await deleteDbClusterFn(token, request, dbClusterName);
  });

  test('DB cluster list restore action', async ({ page }) => {
    await findDbAndClickActions(page, dbClusterName, 'Create DB from a backup');

    await expect(page.getByTestId('restore-form-dialog')).toBeVisible();
    await expect(
      page.getByText('Backup name - date and time finished')
    ).toBeVisible();
    await page.getByTestId('close-dialog-icon').click();
  });

  test('DB cluster detail restore action', async ({ page }) => {
    await findDbAndClickRow(page, dbClusterName);
    const actionButton = page.getByTestId('actions-button');
    await actionButton.click();

    const restoreButton = page.getByTestId(
      `${dbClusterName}-create-new-db-from-backup`
    );
    await restoreButton.click();

    await expect(page.getByTestId('restore-form-dialog')).toBeVisible();
    await expect(
      page.getByText('Backup name - date and time finished')
    ).toBeVisible();
    await page.getByTestId('close-dialog-icon').click();
  });
});
