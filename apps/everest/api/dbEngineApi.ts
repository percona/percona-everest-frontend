import { GetDbEnginesPayload } from '../types/dbEngines.types';
import { api } from './api';

export const getDbEnginesFn = async (clusterId: string) => {
  const response = await api.get<GetDbEnginesPayload>(
    `kubernetes/${clusterId}/database-engines`
  );

  return response.data;
};
