import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  createBackupOnDemand,
  deleteBackupFn,
  getBackupsFn,
  getPitrFn,
} from 'api/backups';
import {
  Backup,
  BackupStatus,
  DatabaseClusterPitr,
  DatabaseClusterPitrPayload,
  GetBackupsPayload,
} from 'shared-types/backups.types';
import { mapBackupState } from 'utils/backups';
import { BackupFormData } from 'pages/db-cluster-details/backups/backups-list/on-demand-backup-modal/on-demand-backup-modal.types.ts';

export const BACKUPS_QUERY_KEY = 'backups';

export const useDbBackups = (
  dbClusterName: string,
  options?: UseQueryOptions<GetBackupsPayload, unknown, Backup[]>
) => {
  return useQuery<GetBackupsPayload, unknown, Backup[]>(
    [BACKUPS_QUERY_KEY, dbClusterName],
    () => getBackupsFn(dbClusterName),
    {
      select: ({ items = [] }) =>
        items.map(
          ({ metadata: { name }, status, spec: { backupStorageName } }) => ({
            name,
            created: status?.created ? new Date(status.created) : null,
            completed: status?.completed ? new Date(status.completed) : null,
            state: status
              ? mapBackupState(status?.state)
              : BackupStatus.UNKNOWN,
            dbClusterName,
            backupStorageName,
          })
        ),
      ...options,
    }
  );
};

export const useCreateBackupOnDemand = (
  dbClusterName: string,
  options?: UseMutationOptions<unknown, unknown, BackupFormData, unknown>
) => {
  return useMutation(
    (formData: BackupFormData) =>
      createBackupOnDemand({
        apiVersion: 'everest.percona.com/v1alpha1',
        kind: 'DatabaseClusterBackup',
        metadata: {
          name: formData.name,
        },
        spec: {
          dbClusterName,
          backupStorageName:
            typeof formData.storageLocation === 'string'
              ? formData.storageLocation
              : formData.storageLocation!.name,
        },
      }),
    { ...options }
  );
};

export const useDeleteBackup = (
  options?: UseMutationOptions<unknown, unknown, string, unknown>
) => {
  return useMutation((backupName: string) => deleteBackupFn(backupName), {
    ...options,
  });
};

export const useDbClusterPitr = (
  dbClusterName: string,
  options?: UseQueryOptions<
    DatabaseClusterPitrPayload,
    unknown,
    DatabaseClusterPitr
  >
) => {
  return useQuery<DatabaseClusterPitrPayload, unknown, DatabaseClusterPitr>(
    `${dbClusterName}-pitr`,
    () => getPitrFn(/*dbClusterName*/),
    {
      select: ({ earliestDate, latestDate, latestBackupName }) => ({
        earliestDate: new Date(earliestDate),
        latestDate: new Date(latestDate),
        latestBackupName,
      }),
      ...options,
    }
  );
};
