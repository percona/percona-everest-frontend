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
import { DBClusterDetailsTabs } from '../../src/pages/db-cluster-details/db-cluster-details.types';
import { clickCreateSchedule } from './schedules.utils';

test.describe.serial('Schedules List', () => {
  let scheduleName = 'test-name';
  const mySQLName = 'schedule-mysql';

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

  test('Create schedule', async ({ page }) => {
    await page.goto('/databases');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }

    const rows = await page.getByRole('row');
    const mySQLrow = rows.filter({ hasText: mySQLName });

    await page
      .getByTestId(`${mySQLName}-status`)
      .filter({ hasText: 'Initializing' });

    await mySQLrow.click();
    const backupsTab = await page.getByTestId(DBClusterDetailsTabs.backups);
    await backupsTab.click();

    const scheduledBackupsAccordion =
      await page.getByTestId('scheduled-backups');
    expect(scheduledBackupsAccordion).toBeFalsy;

    await clickCreateSchedule(page);

    const createDialog = await page.getByRole('dialog');
    const createScheduleText = createDialog.filter({
      hasText: 'Create schedule',
    });
    expect(createScheduleText).toBeVisible();

    const scheduleNameField = await page.getByTestId(
      'text-input-schedule-name'
    );
    expect(scheduleNameField).not.toBeEmpty();
    scheduleNameField.fill(scheduleName);
    const storageLocationField = page.getByTestId(
      'text-input-storage-location'
    );
    await expect(storageLocationField).not.toBeEmpty();
    const clearLocationButton = page
      .getByTestId('storage-location-autocomplete')
      .getByTitle('Clear');
    await clearLocationButton.click();
    await expect(
      page.getByText(
        'Invalid option. Please make sure you added a storage location and select it from the dropdown'
      )
    ).toBeVisible();
    const openStorageLocationOption = page
      .getByTestId('storage-location-autocomplete')
      .getByTitle('Open');
    await openStorageLocationOption.click();
    await page.getByRole('option').first().click();
    await expect(storageLocationField).not.toBeEmpty();

    const createScheduleButton = await createDialog
      .getByRole('button')
      .filter({ hasText: 'create' });
    await createScheduleButton.click();

    expect(page.getByTestId('scheduled-backups')).toBeVisible();
    await scheduledBackupsAccordion.click();

    expect(page.getByText('Every hour at minute 0')).toBeTruthy();

    expect(page.getByText('1 schedule')).toBeTruthy();
  });

  test('Create schedule with duplicate name show validation error', async ({
    page,
  }) => {
    await page.goto(`/databases/${mySQLName}/backups`);
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }

    await clickCreateSchedule(page);

    const createDialog = await page.getByRole('dialog');
    const scheduleNameField = await page.getByTestId(
      'text-input-schedule-name'
    );
    await scheduleNameField.fill(scheduleName);
    const errorMesage = await page.getByText(
      'You already have a schedule with the same name.'
    );
    expect(errorMesage).toBeTruthy();
    await scheduleNameField.fill(`${scheduleName}-one`);

    const selectedTimeBtn = await page.getByTestId(
      'select-selected-time-button'
    );
    await selectedTimeBtn.click();
    const monthOption = await page.getByTestId('month-option');
    await monthOption.click();

    const createScheduleButton = await createDialog
      .getByRole('button')
      .filter({ hasText: 'create' });
    await createScheduleButton.click();

    const scheduledBackupsAccordion =
      await page.getByTestId('scheduled-backups');
    await scheduledBackupsAccordion.click();

    expect(page.getByText('Monthly on day 1 at 12:00 AM')).toBeTruthy();
    expect(page.getByText('2 schedules')).toBeTruthy();
  });

  test('Delete Schedule', async ({ page }) => {
    await page.goto(`/databases/${mySQLName}/backups`);
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }

    const scheduledBackupsAccordion =
      await page.getByTestId('scheduled-backups');
    await scheduledBackupsAccordion.click();

    const scheduleForDeleteBtn = await page
      .getByText('Every hour at minute 0-')
      .getByRole('button');
    await scheduleForDeleteBtn.click();
    await (await page.getByRole('menuitem', { name: 'Delete' })).click();
    await (await page.getByTestId('confirm-dialog-delete')).click();
    expect(page.getByText('1 schedule')).toBeTruthy();
  });

  test('Edit Schedule', async ({ page }) => {
    await page.goto(`/databases/${mySQLName}/backups`);
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }

    const scheduledBackupsAccordion =
      await page.getByTestId('scheduled-backups');
    await scheduledBackupsAccordion.click();

    const scheduleForEditBtn = await page
      .getByTestId('schedule-0 0 1 * *')
      .getByRole('button');

    await scheduleForEditBtn.click();
    await (await page.getByRole('menuitem', { name: 'Edit' })).click();

    expect(page.getByTestId('text-input-schedule-name')).not.toBeEmpty();
    expect(page.getByTestId('text-input-schedule-name')).toHaveValue(
      `${scheduleName}-one`
    );
    expect(page.getByTestId('text-input-storage-location')).not.toBeEmpty();

    await page.getByTestId('select-selected-time-button').click();
    await page.getByTestId('week-option').click();
    await page.getByTestId('select-week-day-button').click();
    await page.getByTestId('Friday').click();
    await page.getByTestId('select-hour-button').click();
    await page.getByRole('option', { name: '6' }).click();
    await page.getByTestId('select-minute-button').click();
    await page.getByRole('option', { name: '08' }).click();
    await page.getByTestId('select-am-pm-button').click();
    await page.getByRole('option', { name: 'PM' }).click();
    await page.getByTestId('form-dialog-save').click();

    expect(page.getByText('Weekly on Fridays at 6:08 PM')).toBeTruthy();
  });
});
