import { api } from './api';
import { DbCluster, GetDbClusterCredentialsPayload, GetDbClusterPayload } from '../types/dbCluster.types';

export const createDbClusterFn = async (data: DbCluster, clusterId: string) => {
  const response = await api.post(
    `kubernetes/${clusterId}/database-clusters`,
    data
  );

  return response.data;
};

export const getDbClusters = async (clusterId: string) => {
  const response = await api.get<GetDbClusterPayload>(
    `kubernetes/${clusterId}/database-clusters`
  );
  return response.data;
};

export const getDbClusterCredentialsFn = async (clusterId: string, dbClusterName: string) => {
  const response = await api.get<GetDbClusterCredentialsPayload>(`/kubernetes/${clusterId}/database-clusters/${dbClusterName}/credentials`);

  return response.data;
}
