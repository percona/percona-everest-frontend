import { RestorePayload } from '../types/restores.types';
import { api } from './api';

export const createDbClusterRestore = async (
  clusterId: string,
  data: RestorePayload
) => {
  const response = await api.post(
    `kubernetes/${clusterId}/database-cluster-restores`,
    data
  );

  return response.data;
};
