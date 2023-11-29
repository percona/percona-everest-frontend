import { chromium } from '@playwright/test';

export const getTokenFromLocalStorage = async () => {
  const browser = await chromium.launch();
  const storageStateContext = await browser.newContext({
    storageState: 'user.json',
  });
  const origins = (await storageStateContext.storageState()).origins;
  storageStateContext.close();
  return origins[0].localStorage.find((item) => item.name === 'pwd').value;
};
