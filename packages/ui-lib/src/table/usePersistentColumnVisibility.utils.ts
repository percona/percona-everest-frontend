import { MRT_VisibilityState } from 'material-react-table';

export const hidePositiveUnnecessaryValues = (
  localStorageValue: MRT_VisibilityState
) => {
  const clearedValues: { [key: string]: boolean } = {};
  for (const [key, value] of Object.entries(localStorageValue)) {
    if (!value) {
      clearedValues[key] = value;
    }
  }
  return clearedValues;
};

export const isObjectEmpty = (obj: object) => Object.keys(obj).length > 0;
