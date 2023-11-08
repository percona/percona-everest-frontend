import { expect, Page } from '@playwright/test';

export const checkNoMatchPage = async (page: Page) => {
  const closeIcon = page.getByTestId('close-dialog-icon');
  if (closeIcon) {
    await closeIcon.click();
  }
  const button = page.getByTestId('no-match-button');

  await expect(button).toBeVisible();
};
