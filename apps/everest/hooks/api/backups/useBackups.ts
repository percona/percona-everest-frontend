import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { deleteBackupFn, getBackupsFn } from '../../../api/backups';
import { Backup, GetBackupPayload } from '../../../types/backups.types';
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

export const useDeleteBackupStorage = (
  options?: UseMutationOptions<any, unknown, string, unknown>
) => {
  const { id } = useSelectedKubernetesCluster();
  return useMutation((backupName: string) => deleteBackupFn(id, backupName), {
    ...options,
  });
};
