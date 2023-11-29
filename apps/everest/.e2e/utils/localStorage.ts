import { BrowserContext } from '@playwright/test';

export const getTokenFromLocalStorage = async (context: BrowserContext) => {
  const origins = (await context.storageState()).origins;

  return origins[0].localStorage.find((item) => item.name === 'pwd').value;
};
