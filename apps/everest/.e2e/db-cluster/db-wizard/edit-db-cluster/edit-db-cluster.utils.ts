import { expect, Page } from '@playwright/test';
export const checkDbWizardEditSubmitIsAvailableAndClick = async (
  page: Page
) => {
  const submitFormButton = page.getByTestId('db-wizard-submit-button');
  await expect(submitFormButton).toHaveText('Edit database');
  await expect(submitFormButton).not.toBeDisabled();
  await submitFormButton.click();
};

export const checkSuccessOfUpdateAndGoToDbClustersList = async (page: Page) => {
  await expect(page.getByText('Your database is being updated')).toBeVisible();
  const goToDbClustersButton = page.getByTestId('db-wizard-goto-db-clusters');
  await expect(goToDbClustersButton).not.toBeDisabled();
  await goToDbClustersButton.click();
};
