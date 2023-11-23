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

import { Page, expect } from '@playwright/test';
import { testMonitoringName2 } from '../../../../utils/monitoring-instance';

export const monitoringStepCheck = async (
  page: Page,
  monitoringInstancesList
) => {
  await expect(page.getByRole('heading', { name: 'Monitoring' })).toBeVisible();
  await page.getByLabel('Enable monitoring').check();

  expect(await page.getByLabel('Enable monitoring').isChecked()).toBeTruthy();

  await page.getByTestId('text-input-monitoring-instance').click();
  const monitoringOptions = page.getByRole('option');

  monitoringInstancesList.forEach((option) =>
    expect(
      monitoringOptions.filter({ hasText: `${option.name} (${option.url})` })
    ).toBeVisible()
  );

  await monitoringOptions
    .filter({ hasText: `${testMonitoringName2} (http://monitoring)` })
    .click();
};
