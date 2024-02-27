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
import { findRowAndClickActions } from '../utils/table';
const { MONITORING_URL, MONITORING_USER, MONITORING_PASSWORD } = process.env;

test.describe('Monitoring List', () => {
  // let namespaces = [];
  const monitoringEndpointName = 'monitoring-test';
  // test.beforeAll(async ({ request }) => {
  //     const token = await getTokenFromLocalStorage();
  //     namespaces = await getNamespacesFn(token, request);
  // });

  test.beforeEach(async ({ page }) => {
    await page.goto('/settings/monitoring-endpoints');
    await page.getByTestId('add-monitoring-endpoint').waitFor();
  });

  test('Create Monitoring Endpoint', async ({ page }) => {
    await page.getByTestId('add-monitoring-endpoint').click();

    // filling out the form
    await page.getByTestId('text-input-name').fill(monitoringEndpointName);
    const namespaces = page.getByTestId('text-input-target-namespaces');
    await namespaces.click();
    await page.getByRole('option').last().click();
    await page.getByTestId('text-input-url').fill(MONITORING_URL);
    await page.getByTestId('text-input-user').fill(MONITORING_USER);
    await page.getByTestId('text-input-password').fill(MONITORING_PASSWORD);

    await page.getByTestId('form-dialog-add').click();

    // checking that monitoring has been added
    await findRowAndClickActions(page, monitoringEndpointName);
  });
  test('Edit Monitoring Endpoint', async ({ page }) => {
    await page
      .locator('.MuiTableRow-root')
      .filter({ hasText: monitoringEndpointName })
      .getByTestId('MoreHorizIcon')
      .click();

    await page.getByRole('menuitem', { name: 'Edit' }).click();
    await page.getByTestId('confirm-dialog-delete').click();

    await page.pause();

    // filling out the form
    await page.getByTestId('text-input-name').fill(monitoringEndpointName);
    const namespaces = page.getByTestId('text-input-target-namespaces');
    await namespaces.click();
    await page.getByRole('option').last().click();
    await page.getByTestId('text-input-url').fill(MONITORING_URL);
    await page.getByTestId('text-input-user').fill(MONITORING_USER);
    await page.getByTestId('text-input-password').fill(MONITORING_PASSWORD);

    await page.getByTestId('form-dialog-add').click();

    // checking that monitoring has been added

    await findRowAndClickActions(page, monitoringEndpointName, 'Delete');
    await page.getByTestId('confirm-dialog-delete').click();

    await page.pause();
  });
});
