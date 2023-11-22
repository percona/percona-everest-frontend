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
import {
  createDbClusterFn,
  deleteDbClusterFn,
} from '../../../utils/db-cluster';
import {
  checkDbWizardEditSubmitIsAvailableAndClick,
  checkSuccessOfUpdateAndGoToDbClustersList,
} from './edit-db-cluster.utils';
import {
  findDbAndClickActions,
  findDbAndClickRow,
} from '../../../utils/db-clusters-list';
import { DBClusterDetailsTabs } from '../../../../src/pages/db-cluster-details/db-cluster-details.types';

test.describe.serial('DB Cluster Editing Backups Step', () => {
  let scheduleName = 'db-wizard-schedule';
  const mySQLName = 'db-backup-mysql';

  test.beforeAll(async ({ request }) => {
    await createDbClusterFn(request, {
      dbName: mySQLName,
      dbType: 'mysql',
      numberOfNodes: '1',
    });
  });

  test.afterAll(async ({ request }) => {
    await deleteDbClusterFn(request, mySQLName);
  });

  test('Add schedule to database with no schedule during editing in dbWizard', async ({
    page,
  }) => {
    await page.goto('/databases');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }

    await findDbAndClickActions(page, mySQLName);

    await page.getByRole('menuitem', { name: 'Edit' }).click();

    const nextStep = page.getByTestId('db-wizard-continue-button');

    // Go to Resources step
    await nextStep.click();
    // Go to Backups step
    await nextStep.click();

    const enabledBackupsCheckbox = page
      .getByTestId('switch-input-backups-enabled')
      .getByRole('checkbox');
    await expect(enabledBackupsCheckbox).not.toBeChecked();

    await enabledBackupsCheckbox.setChecked(true);

    const scheduleNameField = page.getByTestId('text-input-schedule-name');
    await expect(scheduleNameField).not.toBeEmpty();
    await scheduleNameField.fill(scheduleName);
    // TODO check validation of scheduleName (rfc_123)

    await expect(
      page.getByTestId('text-input-storage-location')
    ).not.toBeEmpty();
    await expect(
      page.getByText(
        'Everest will create a backup of your database every hours, starting at minute 0.'
      )
    ).toBeVisible();

    // Go to Advanced Configuration step
    await nextStep.click();
    // Go to Monitoring step
    await nextStep.click();

    await checkDbWizardEditSubmitIsAvailableAndClick(page);
    await checkSuccessOfUpdateAndGoToDbClustersList(page);

    await findDbAndClickRow(page, mySQLName);

    // go to backups tab in db-cluster details
    const backupsTab = page.getByTestId(DBClusterDetailsTabs.backups);
    await backupsTab.click();

    // check the schedule in the list of schedules
    const scheduledBackupsAccordion = page.getByTestId('scheduled-backups');
    await expect(scheduledBackupsAccordion).toBeVisible();
    await scheduledBackupsAccordion.click();

    expect(page.getByText('Every hour at minute 0')).toBeTruthy();
  });
});
