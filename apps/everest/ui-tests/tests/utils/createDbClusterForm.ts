import { Page, expect, Locator } from '@playwright/test';
import { DbEngineType } from '../../../types/dbEngines.types';

export type EngineVersions = {
  [DbEngineType.PXC]: any[];
  [DbEngineType.PSMDB]: any[];
  [DbEngineType.POSTGRESQL]: any[];
};
export const createDbClusterPageIsReady = async (page: Page) => {
  await page.goto('/databases/new');
  await page.getByTestId('toggle-button-group-input-db-type').waitFor();
  await page.getByTestId('select-input-db-version').waitFor();
};

export const dbEnginesButtonsIsReady = async (
  page: Page
): Promise<{ [type in DbEngineType]: Locator }> => {
  const dbEnginesButtons = page
    .getByTestId('toggle-button-group-input-db-type')
    .getByRole('button');
  const nrButtons = await dbEnginesButtons.count();

  expect(nrButtons).toBe(3);

  const mySqlButton = dbEnginesButtons.filter({ hasText: 'MySQL' });
  const mongoButton = dbEnginesButtons.filter({ hasText: 'MongoDB' });
  const postgreSQLButton = dbEnginesButtons.filter({ hasText: 'PostgreSQL' });

  await expect(mySqlButton).toBeVisible();
  await expect(mongoButton).toBeVisible();
  await expect(postgreSQLButton).toBeVisible();

  return {
    [DbEngineType.PXC]: mySqlButton,
    [DbEngineType.PSMDB]: mongoButton,
    [DbEngineType.POSTGRESQL]: postgreSQLButton,
  };
};
