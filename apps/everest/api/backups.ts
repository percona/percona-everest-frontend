import { BackupPayload, GetBackupPayload } from '../types/backups.types';
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

export const createBackupOnDemand = async (
  clusterId: string,
  payload: BackupPayload
) => {
  const response = await api.post<GetBackupPayload>(
    `kubernetes/${clusterId}/database-cluster-backups`,
    payload
  );
  return response.data;
};

export const deleteBackupFn = async (clusterId: string, backupName: string) => {
  const response = await api.delete(
    `kubernetes/${clusterId}/database-cluster-backups/${backupName}`
  );

  return response.data;
};
