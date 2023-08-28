import { GetBackupPayload } from '../types/backups.types';
import { api } from './api';

export const getBackupsFn = async (
  clusterId: string,
  dbClusterName: string
) => {
  const response = await api.get<GetBackupPayload>(
    `kubernetes/${clusterId}/database-clusters/${dbClusterName}/backups`
  );

  return response.data;
};
