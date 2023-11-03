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
import { expect } from '@playwright/test';
export const basicInformationStepCheck = async (page, engineVersions, storageClasses, clusterName) => {
    const dbEnginesButtons = page
        .getByTestId('toggle-button-group-input-db-type')
        .getByRole('button');
    const nrButtons = await dbEnginesButtons.count();
    expect(nrButtons).toBe(3);
    const mySqlButton = dbEnginesButtons.filter({ hasText: 'MySQL' });
    const mongoButton = dbEnginesButtons.filter({ hasText: 'MongoDB' });
    await expect(mySqlButton).toBeVisible();
    await expect(mongoButton).toBeVisible();
    await mongoButton.click();
    await page.getByTestId('select-db-version-button').click();
    const dbVersionOptions = page.getByRole('option');
    engineVersions.psmdb.forEach((version) => expect(dbVersionOptions.filter({ hasText: new RegExp(`^${version}$`) })).toBeVisible());
    await page.getByRole('option').first().click();
    await page.getByTestId('text-input-db-name').fill(clusterName);
    await page.getByTestId('text-input-storage-class').click();
    const storageClassOptions = page.getByRole('option');
    storageClasses.forEach((className) => expect(storageClassOptions.filter({ hasText: new RegExp(`^${className}$`) })).toBeVisible());
    await page.getByRole('option').first().click();
};
//# sourceMappingURL=basic-information-step.js.map