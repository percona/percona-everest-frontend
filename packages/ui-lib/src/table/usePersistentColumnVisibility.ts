import { MRT_Updater, MRT_VisibilityState } from 'material-react-table';
import { useEffect, useState } from 'react';

const usePersistentColumnVisibility = (
  key: string
): [
  MRT_VisibilityState,
  (updater: MRT_Updater<MRT_VisibilityState>) => void,
] => {
  const [localStorageValue, setLocalStorageValue] = useState(() => {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }
      return {};
    } catch (error) {
      return {};
    }
  });

  const setLocalStorageStateValue = (
    updater: MRT_Updater<MRT_VisibilityState>
  ) => {
    setLocalStorageValue((prevValues: MRT_VisibilityState) =>
      updater instanceof Function ? updater(prevValues) : updater
    );
  };

  useEffect(() => {
    if (Object.keys(localStorageValue).length > 0) {
      localStorage.setItem(key, JSON.stringify(localStorageValue));
    }
  }, [localStorageValue]);

  return [localStorageValue, setLocalStorageStateValue];
};

export default usePersistentColumnVisibility;
