import { test, expect } from '@playwright/test';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { createDbClusterFn, deleteDbClusterFn } from '../utils/db-cluster';
import { getK8sClusters } from '../utils/k8s-clusters';
import { BACKUP_STORAGE_NAME } from '../constants';

test.describe('DB Cluster Backups Schedules', async () => {
  const pxcClusterName = 'pxc-schedules-test';
  let kubernetesId: string;

  test.beforeAll(async ({ request }) => {
    kubernetesId = (await getK8sClusters(request))[0].id;

    await createDbClusterFn(
      request,
      {
        dbName: pxcClusterName,
        dbType: DbType.Mysql,
        numberOfNodes: '1',
        cpu: 0.6,
        disk: 1,
        memory: 1,
        externalAccess: true,
        sourceRanges: [
          {
            sourceRange: 'http://192.168.1.1',
          },
        ],
        backupsEnabled: true,
        schedules: [
          {
            enabled: true,
            name: 'pxc-schedule',
            backupStorageName: BACKUP_STORAGE_NAME,
            schedule: '5 2 1 1 *',
          },
          {
            enabled: true,
            name: 'pxc-schedule',
            backupStorageName: BACKUP_STORAGE_NAME,
            schedule: '5 2 1 2 *',
          },
        ],
      },
      kubernetesId
    );
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/databases');
    await page.getByTestId('close-dialog-icon').click();
  });

  test.afterAll(async ({ request }) => {
    await deleteDbClusterFn(request, kubernetesId, pxcClusterName);
  });

  test('Schedules list', async ({ page }) => {
    const row = await page.getByText(pxcClusterName);
    await row.click();

    await expect(
      page.getByRole('heading', {
        name: pxcClusterName,
      })
    ).toBeVisible();

    // go to backups tab
    // check the list
  });
});
