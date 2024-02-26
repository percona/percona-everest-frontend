import { useState } from 'react';

const usePersistentColumnVisibility = (key: string, defaultValue: unknown) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setLocalStorageStateValue = (updater: unknown) => {
    let result = null;
    setLocalStorageValue((prevValues: unknown) => {
      result = updater instanceof Function ? updater(prevValues) : updater;
      return result;
    });
    localStorage.setItem(key, JSON.stringify(result));
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default usePersistentColumnVisibility;
