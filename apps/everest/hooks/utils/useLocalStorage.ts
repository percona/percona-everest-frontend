import { useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      } else {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
      }
    } catch (error) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
  });

  const setLocalStorageStateValue = (valueOrFn) => {
    let newValue;
    if (typeof valueOrFn === 'function') {
      const fn = valueOrFn;
      newValue = fn(localStorageValue);
    } else {
      newValue = valueOrFn;
    }
    localStorage.setItem(key, JSON.stringify(newValue));
    setLocalStorageValue(newValue);
  };
  return [localStorageValue, setLocalStorageStateValue];
};

export default useLocalStorage;
