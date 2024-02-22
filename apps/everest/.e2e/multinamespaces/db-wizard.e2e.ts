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

test.describe.serial('Namespaces DB Wizard', () => {
  let dbVersion = '';
  test.beforeAll(async ({ request }) => {
    const token = await getTokenFromLocalStorage();
  });

  // skip locally
  test('Changing of namespace cause updation of dbEngines, dbVersions, dbName', async ({
    page,
  }) => {
    await page.goto('/databases');
    const button = page.getByTestId('add-db-cluster-button');
    await button.click();

    await page.pause();

    // setting everest-pxc namespace
    const namespacesList = page.getByTestId('k8s-namespace-autocomplete');
    await namespacesList.click();
    await page.getByRole('option', { name: 'everest-pxc' }).click();

    // checking and saving fields for pxc
    const dbEnginesButtons = await page
      .getByTestId('toggle-button-group-input-db-type')
      .getByRole('button')
      .count();
    expect(dbEnginesButtons).toBe(3); //1
    await expect(page.getByTestId('mysql-toggle-button')).toBeVisible();

    const name = page.getByTestId('text-input-db-name');
    await expect(name).toHaveValue(/.*mysql.*/);

    page
      .getByTestId('select-input-db-version')
      .inputValue()
      .then((value) => {
        dbVersion = value;
      });

    //changing namespace to everest-psmdb
    await namespacesList.click();
    await page.getByRole('option', { name: 'everest-psmdb' }).click();

    // checking changes of all fields
    expect(dbEnginesButtons).toBe(3); // 1
    const mongoDbBtn = page.getByTestId('mongodb-toggle-button');
    await expect(mongoDbBtn).toBeVisible();

    await expect(name).toHaveValue(/.*mongo.*/);

    expect(page.getByTestId('select-input-db-version').inputValue()).toBe(
      dbVersion
    );
  });
});
