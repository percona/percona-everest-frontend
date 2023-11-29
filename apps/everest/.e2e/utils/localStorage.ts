import { chromium } from '@playwright/test';
import { STORAGE_STATE_FILE } from '../constants';

export const getTokenFromLocalStorage = async () => {
  const browser = await chromium.launch();
  const storageStateContext = await browser.newContext({
    storageState: STORAGE_STATE_FILE,
  });
  const origins = (await storageStateContext.storageState()).origins;
  console.log(
    (await storageStateContext.storageState()).origins[0].localStorage
  );
  storageStateContext.close();
  return origins[0].localStorage.find((item) => item.name === 'pwd').value;
};
