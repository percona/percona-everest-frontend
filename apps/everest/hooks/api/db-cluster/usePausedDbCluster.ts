import { UseMutationOptions, useMutation } from 'react-query';
import { updateDbClusterFn } from '../../../api/dbClusterApi';
import { DbCluster } from '../../../types/dbCluster.types';

type PausedDBClusterArgType = {
  paused: boolean;
  k8sClusterId: string;
  dbCluster: DbCluster;
};

export const usePausedDbCluster = (
  options?: UseMutationOptions<any, unknown, PausedDBClusterArgType, unknown>
) => {
  return useMutation(
    ({ paused, k8sClusterId, dbCluster }: PausedDBClusterArgType) => {
      const dbClusterName = dbCluster?.metadata?.name;
      const payload: DbCluster = {
        ...dbCluster,
        spec: {
          ...dbCluster.spec,
          paused,
        },
      };
      return updateDbClusterFn(k8sClusterId, dbClusterName, payload);
    },
    { ...options }
  );
};
