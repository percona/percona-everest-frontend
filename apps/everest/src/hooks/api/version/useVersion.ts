import { useQuery } from 'react-query';
import { getVersionFn } from 'api/version';

export const useVersion = () =>
  useQuery('everest-version', () => getVersionFn());
