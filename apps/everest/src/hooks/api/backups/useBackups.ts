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
} from '../../../api/backups';
import { BackupFormData } from '../../../pages/db-cluster-details/backups/backups-list/on-demand-backup-modal/on-demand-backup-modal.types';
import { Backup, GetBackupPayload } from '../../../shared-types/backups.types';
import { mapBackupState } from '../../../utils/backups';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';

export const BACKUPS_QUERY_KEY = 'backups';

export const useDbBackups = (
  dbClusterName: string,
  options?: UseQueryOptions<GetBackupPayload, unknown, Backup[]>
) => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<GetBackupPayload, unknown, Backup[]>(
    [BACKUPS_QUERY_KEY, dbClusterName],
    () => getBackupsFn(id, dbClusterName),
    {
      select: ({ items = [] }) =>
        items.map(
          ({ metadata: { name }, status, spec: { backupStorageName } }) => ({
            name,
            created: status?.created ? new Date(status.created) : null,
            completed: status?.completed ? new Date(status.completed) : null,
            state: mapBackupState(status?.state),
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
  const { id: clusterId } = useSelectedKubernetesCluster();
  return useMutation(
    (formData: BackupFormData) =>
      createBackupOnDemand(clusterId, {
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
  const { id } = useSelectedKubernetesCluster();
  return useMutation((backupName: string) => deleteBackupFn(id, backupName), {
    ...options,
  });
};
