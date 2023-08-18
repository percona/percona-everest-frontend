import { useQuery, UseQueryOptions } from "react-query";
import { useSelectedKubernetesCluster } from "../kubernetesClusters/useSelectedKubernetesCluster";
import { Backup, GetBackupPayload } from "../../../types/backups.types";
import { getBackupsFn } from "../../../api/backups";

export const useDbBackups = (dbClusterName: string, options?: UseQueryOptions<GetBackupPayload, unknown, Backup[]>,) => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<GetBackupPayload, unknown, Backup[]>(
    `${dbClusterName}-backups`,
    () => getBackupsFn(id, dbClusterName),
    {
      select: ({ items = [] }) => items.map(({ metadata: { name }, status, spec: { dbClusterName, backupStorageName } }) => ({
        name,
        created: status?.created ? new Date(status.created) : null,
        completed: status?.completed ? new Date(status.completed) : null,
        state: status?.state || '',
        dbClusterName,
        backupStorageName
      })),
      ...options
    }
  );
}
