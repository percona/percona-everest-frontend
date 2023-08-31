import { useMutation, UseMutationOptions } from 'react-query';
import { createDbClusterRestore } from '../../../api/restores';
import { dbEngineToDbType } from '../../../utils/db';
import { useDbCluster } from '../db-cluster/useDbCluster';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';

export type RestoreFormData = {
  backupName: string;
};

export const useDbClusterRestore = (
  dbClusterName: string,
  options?: UseMutationOptions<any, unknown, RestoreFormData, unknown>
) => {
  const { id: clusterId } = useSelectedKubernetesCluster();
  const db = useDbCluster(dbClusterName);
  const dbType = dbEngineToDbType(db.data?.spec.engine.type!);
  return useMutation(
    (formData: RestoreFormData) =>
      createDbClusterRestore(clusterId, {
        apiVersion: 'everest.percona.com/v1alpha1',
        kind: 'DatabaseClusterRestore',
        metadata: {
          name: `restore-${formData.backupName}`,
        },
        spec: {
          backupName: formData.backupName,
          databaseCluster: dbClusterName,
          databaseType: dbType,
        },
      }),
    { ...options }
  );
};
