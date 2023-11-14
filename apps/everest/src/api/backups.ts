import { BackupPayload, GetBackupPayload } from 'shared-types/backups.types';
import { api } from './api';

export const getBackupsFn = async (dbClusterName: string) => {
  const response = await api.get<GetBackupPayload>(
    `/database-clusters/${dbClusterName}/backups`
  );

  return response.data;
};

export const createBackupOnDemand = async (payload: BackupPayload) => {
  const response = await api.post<GetBackupPayload>(
    `/database-cluster-backups`,
    payload
  );
  return response.data;
};

export const deleteBackupFn = async (backupName: string) => {
  const response = await api.delete(`/database-cluster-backups/${backupName}`);

  return response.data;
};
