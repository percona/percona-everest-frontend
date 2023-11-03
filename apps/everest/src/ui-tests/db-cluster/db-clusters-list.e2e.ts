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

import { DbType } from '@percona/types';
import { test } from '@playwright/test';
import { createDbClusterFn } from '../utils/db-cluster';
import { getK8sClusters } from '../utils/k8s-clusters';

test.describe('DB Cluster List', () => {
  let kubernetesId: string;
  const mySQLName = 'mysql-test-ui';

  test.beforeAll(async ({ request }) => {
    kubernetesId = (await getK8sClusters(request))[0].id;
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/databases');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
  });

  test('DB clusters Delete Action', async ({ page, request }) => {
    await createDbClusterFn(
      request,
      {
        dbName: mySQLName,
        dbType: DbType.Mysql,
        numberOfNodes: '1',
      },
      kubernetesId
    );
    // TODO waiting of adding dbCluster function is not necessary but would be good

    const rows = await page.getByRole('row');
    const mySQLrow = rows.filter({ hasText: mySQLName });
    const button = mySQLrow.getByTestId('MoreHorizIcon');
    await button.click();

    // Delete action
    const deleteButton = page.getByTestId(`${mySQLName}-delete`);
    await deleteButton.click();
    await page.getByTestId(`${mySQLName}-confirm-dialog`).waitFor();
    await page.pause();
    const deleteConfirmationButton = await page
      .getByRole('button')
      .filter({ hasText: 'Delete' });
    await deleteConfirmationButton.click();
  });

  test.skip('DB cluster Edit', async () => {
    // TODO check switching page to editing
  });

  test.skip('DB cluster Paused/Resume', async () => {
    // TODO check update of Paused/Resume Status
  });

  test.skip('DB cluster Restarting', async () => {
    // TODO check updating of status
  });

  // TODO return and move to separate test
  // await page.goto('/databases');

  // cluster actions menu click
  // (
  //   await page
  //     .locator('.MuiTableRow-root')
  //     .filter({ hasText: 'db-cluster-ui-test' })
  //     .getByTestId('MoreHorizIcon')
  // ).click();
  //
  // const suspendAction = page.getByTestId('PauseCircleOutlineIcon');
  // await suspendAction.click();
  // await page.reload();
  //
  // const clusterRowAfterSuspend = await page
  //   .locator('.MuiTableRow-root')
  //   .filter({ hasText: 'db-cluster-ui-test' });
  //
  // await (await clusterRowAfterSuspend.getByTestId('MoreHorizIcon')).click();
  // const resumeAction = page.getByTestId('PauseCircleOutlineIcon');
  // await resumeAction.click();
  //
  // await page.reload();
  // (
  //   await page
  //     .locator('.MuiTableRow-root')
  //     .filter({ hasText: 'db-cluster-ui-test' })
  //     .getByTestId('MoreHorizIcon')
  // ).click();
  // const restartAction = page.getByTestId('PlayArrowOutlinedIcon');
  // await restartAction.click();

  // await page.reload();
  // (
  //   await page
  //     .locator('.MuiTableRow-root')
  //     .filter({ hasText: 'db-cluster-ui-test' })
  //     .getByTestId('MoreHorizIcon')
  // ).click();
  // const deleteAction = page.getByTestId('DeleteOutlineIcon');
  // await deleteAction.click();
  //
  // await page.reload();
  // expect(await page.getByText('db-cluster-ui-test').count()).toEqual(0);
});
