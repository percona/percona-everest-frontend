import { authConfig } from "../auth-config";
import { PREVIOUS_PATH_STORAGE_KEY } from "../constants";

export const getPreviousPath = () => {
  const prevPath = window.sessionStorage.getItem(PREVIOUS_PATH_STORAGE_KEY);
  window.sessionStorage.removeItem(PREVIOUS_PATH_STORAGE_KEY);
  return prevPath || '/';
}

export const setPreviousPath = () => {
  const prevPath = window.location.pathname + window.location.search + window.location.hash;
  if (prevPath.startsWith(authConfig.redirect_uri!)) {
    return;
  }

  window.sessionStorage.setItem(PREVIOUS_PATH_STORAGE_KEY, prevPath);
}
