import { expect } from '@playwright/test';
export const checkNoMatchPage = async (page) => {
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
        await closeIcon.click();
    }
    const button = page.getByTestId('no-match-button');
    await expect(button).toBeVisible();
};
//# sourceMappingURL=no-match.js.map