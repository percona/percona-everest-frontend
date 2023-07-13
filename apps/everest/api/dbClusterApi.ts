import { DatabaseClusterList, DbClusterRaw } from '../hooks/db-clusters/dbCluster.type';
import { DbWizardType } from '../pages/new-database/new-database.types';
import { api } from './api';

export const createDbClusterFn = async (
  formData: DbWizardType,
  clusterId: string
) => {
  const response = await api.post(
    `kubernetes/${clusterId}/database-clusters`,
    formData
  );

  return response.data;
};

export const getDbClusters = async (clusterId: string) => {
  const response = await api.get<DatabaseClusterList>(
    `kubernetes/${clusterId}/database-clusters`
  );
  return response.data;
};
