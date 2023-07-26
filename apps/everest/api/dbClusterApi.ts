import { api } from './api';
import { CreateDBClusterPayload } from '../types/dbCluster.types';

export const createDbClusterFn = async (
  data: CreateDBClusterPayload,
  clusterId: string
) => {
  const response = await api.post(
    `kubernetes/${clusterId}/database-clusters`,
    data
  );

  return response.data;
};
