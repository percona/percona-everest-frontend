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
import { getK8sClusters } from '../utils/k8s-clusters';

test.describe('No match (404) page', () => {
  test.beforeAll(async ({ request }) => {
    await getK8sClusters(request);
  });

  test('databases page successfully loaded', async ({ page }) => {
    await page.goto('/databases');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
    const button = page.getByTestId('create-database-button');

    await expect(button).toBeVisible();
  });

  test('non existing url should render no match page', async ({ page }) => {
    await page.goto('/wrong');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
    const button = page.getByTestId('no-match-button');

    await expect(button).toBeVisible();
  });

  test('non existing url with slash should render no match page', async ({
    page,
  }) => {
    await page.goto('/wrong/wrong');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
    const button = page.getByTestId('no-match-button');

    await expect(button).toBeVisible();
  });

  test('non existing url with double slash should render no match page', async ({
    page,
  }) => {
    await page.goto('/wrong/wrong/wrong');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
    const button = page.getByTestId('no-match-button');

    await expect(button).toBeVisible();
  });

  test('existing url with non existing after slash should render no match page', async ({
    page,
  }) => {
    await page.goto('/database/wrong');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
    const button = page.getByTestId('no-match-button');

    await expect(button).toBeVisible();
  });

  test('overview tab with non existing dbName should render no match page', async ({
    page,
  }) => {
    await page.goto('/databases/wrong/overview');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
    const button = page.getByTestId('no-match-button');

    await expect(button).toBeVisible();
  });

  test('backups tab with non existing dbName should render no match page', async ({
    page,
  }) => {
    await page.goto('/databases/wrong/backups');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
    const button = page.getByTestId('no-match-button');

    await expect(button).toBeVisible();
  });
});
