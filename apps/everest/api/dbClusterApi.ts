import { api } from './api';
import { DbCluster, GetDbClustersPayload } from '../types/dbCluster.types';

export const createDbClusterFn = async (data: DbCluster, clusterId: string) => {
  const response = await api.post(
    `kubernetes/${clusterId}/database-clusters`,
    data
  );

  return response.data;
};

export const updateDbCluster = async (
  k8sClusterId: string,
  dbClusterName: string,
  data: DbCluster
) => {
  const response = await api.put(
    `kubernetes/${k8sClusterId}/database-clusters/${dbClusterName}`,
    data
  );

  return response.data;
};

export const getDbClusters = async (clusterId: string) => {
  const response = await api.get<GetDbClustersPayload>(
    `kubernetes/${clusterId}/database-clusters`
  );
  return response.data;
};

export const getDbCluster = async (
  k8sClusterId: string,
  dbClusterName: string
) => {
  const response = await api.get<DbCluster>(
    `kubernetes/${k8sClusterId}/database-clusters/${dbClusterName}`
  );
  return response.data;
};
//TODO return
// export const deleteDbCluster = async (
//   k8sClusterId: string,
//   dbClusterName: string
// ) => {
//   const response = await api.delete<DbCluster>(
//     `kubernetes/${k8sClusterId}/database-clusters/${dbClusterName}`
//   );
//   return response.data;
// };
