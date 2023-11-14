import { RestorePayload } from '../shared-types/restores.types';
import { api } from './api';

export const createDbClusterRestore = async (data: RestorePayload) => {
  const response = await api.post(`/database-cluster-restores`, data);

  return response.data;
};
