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

import { test as setup, expect } from '@playwright/test';
import 'dotenv/config';
import { createBackupStorageFn } from './utils/backup-storage';

setup('Backup storage', async ({ request }) => {
  await createBackupStorageFn(request, 'ui-dev');
});

setup('Close modal permanently', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('close-dialog-icon').click();
  await page.context().storageState({ path: 'user.json' });
});

// setup('Monitoring setup', async ({ request }) => {
//   await createMonitoringInstance(request, testMonitoringName);
//   await createMonitoringInstance(request, testMonitoringName2);
// });
