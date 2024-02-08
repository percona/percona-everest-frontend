import {
  BackupPayload,
  DatabaseClusterPitrPayload,
  GetBackupsPayload,
  SingleBackupPayload,
} from 'shared-types/backups.types';
import { api } from './api';

export const getBackupsFn = async (
  dbClusterName: string,
  namespace: string
) => {
  const response = await api.get<GetBackupsPayload>(
    `namespaces/${namespace}/database-clusters/${dbClusterName}/backups`
  );

  return response.data;
};

export const createBackupOnDemand = async (
  payload: BackupPayload,
  namespace: string
) => {
  const response = await api.post<SingleBackupPayload>(
    `namespaces/${namespace}/database-cluster-backups`,
    payload
  );
  return response.data;
};

export const deleteBackupFn = async (backupName: string, namespace: string) => {
  const response = await api.delete(
    `namespaces/${namespace}/database-cluster-backups/${backupName}`
  );

  return response.data;
};

export const getPitrFn = async (dbClusterName: string, namespace: string) => {
  const response = await api.get<DatabaseClusterPitrPayload>(
    `/namespaces/${namespace}/database-clusters/${dbClusterName}/pitr`
  );

  return response.data;
};
