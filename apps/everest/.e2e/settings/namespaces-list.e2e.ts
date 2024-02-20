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
import { getTokenFromLocalStorage } from '../utils/localStorage';
import { getNamespacesFn } from '../utils/namespaces';

test.describe('Namespaces List', () => {
  let namespaces = [];
  test.beforeAll(async ({ request }) => {
    const token = await getTokenFromLocalStorage();
    namespaces = await getNamespacesFn(token, request);
  });

  test('Namespace List displayed', async ({ page }) => {
    await page.goto('/settings/namespaces');
    expect(page.getByText(namespaces[0])).toBeTruthy();
  });

  test('Provisioning is working right', async ({ page }) => {
    await page.goto('/settings/namespaces');
    await page.pause();
    const rowsCount = await page.locator('.MuiTableRow-root').count();
    expect(rowsCount - 1).toBe(4);
  });
});
