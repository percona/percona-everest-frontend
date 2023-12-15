import {
  BackupPayload,
  DatabaseClusterPitrPayload,
  GetBackupsPayload,
  SingleBackupPayload,
} from 'shared-types/backups.types';
import { api } from './api';

export const getBackupsFn = async (dbClusterName: string) => {
  const response = await api.get<GetBackupsPayload>(
    `/database-clusters/${dbClusterName}/backups`
  );

  return response.data;
};

export const createBackupOnDemand = async (payload: BackupPayload) => {
  const response = await api.post<SingleBackupPayload>(
    `/database-cluster-backups`,
    payload
  );
  return response.data;
};

export const deleteBackupFn = async (backupName: string) => {
  const response = await api.delete(`/database-cluster-backups/${backupName}`);

  return response.data;
};

export const getPitrFn = async (/*dbClusterName: string*/) => {
  // TODO uncomment after API is ready
  // const response = await api.get<DatabaseClusterPitr>(
  //   `/database-clusters/${dbClusterName}/pitr`
  // );

  // return response.data;

  const payload: DatabaseClusterPitrPayload = {
    earliestDate: '2023-12-01 23:59:59',
    latestDate: '2023-12-05 23:59:59',
    latestBackupName: 'my-backup',
    gaps: true,
  };

  return payload;
};
