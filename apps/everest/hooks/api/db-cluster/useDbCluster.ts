import { useQuery } from 'react-query';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
import { useSelectedDBCluster } from '../../db-cluster/useSelectedDBCluster';
import { DbCluster } from '../../../types/dbCluster.types';
import { getDbCluster } from '../../../api/dbClusterApi';

export const useDbCluster = (enabled?: boolean) => {
  const { id } = useSelectedKubernetesCluster();
  const { dbClusterName } = useSelectedDBCluster();
  debugger;

  return useQuery<DbCluster, unknown, DbCluster>(
    'dbCluster',
    () => getDbCluster(id, dbClusterName),
    {
      enabled,
    }
  );
};
