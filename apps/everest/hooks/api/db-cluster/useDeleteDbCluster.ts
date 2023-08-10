import { useMutation, UseMutationOptions } from 'react-query';
import { deleteDbClusterFn } from '../../../api/dbClusterApi';

type DeleteDbClusterArgType = {
  k8sClusterId: string;
  dbClusterName: string;
};
export const useDeleteDbCluster = (
  options?: UseMutationOptions<any, unknown, DeleteDbClusterArgType, unknown>
) => {
  return useMutation(
    ({ k8sClusterId, dbClusterName }: DeleteDbClusterArgType) =>
      deleteDbClusterFn(k8sClusterId, dbClusterName),
    {
      ...options,
    }
  );
};
