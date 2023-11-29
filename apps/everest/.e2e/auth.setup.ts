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
import { STORAGE_STATE_FILE } from './constants';
const { EVEREST_K8_PASSWORD } = process.env;

setup('Login', async ({ page }) => {
  page.goto('/login');
  console.log('STORAGE_STATE_FILE', STORAGE_STATE_FILE);
  await page.getByTestId('text-input-password').fill(EVEREST_K8_PASSWORD);
  await page.getByTestId('login-button').click();
  await expect(page.getByText('Create Database')).toBeVisible();
  await page.context().storageState({ path: STORAGE_STATE_FILE });
});
