import { UseMutationOptions, useMutation } from 'react-query';
import { updateDbClusterFn } from '../../../api/dbClusterApi';
import { DbCluster } from '../../../types/dbCluster.types';

type PausedDBClusterArgType = {
  k8sClusterId: string;
  dbCluster: DbCluster;
};

export const useRestartDbCluster = (
  options?: UseMutationOptions<any, unknown, PausedDBClusterArgType, unknown>
) => {
  return useMutation(
    ({ k8sClusterId, dbCluster }: PausedDBClusterArgType) => {
      const payload: DbCluster = {
        ...dbCluster,
        metadata: {
          ...dbCluster.metadata,
          annotations: {
            'everest.percona.com/restart': 'true',
          },
        },
      };
      return updateDbClusterFn(
        k8sClusterId,
        dbCluster?.metadata?.name,
        payload
      );
    },
    { ...options }
  );
};
