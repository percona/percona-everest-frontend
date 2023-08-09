import { useQuery } from 'react-query';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
import { useSelectedDBCluster } from '../../db-cluster/useSelectedDBCluster';
import { DbCluster } from '../../../types/dbCluster.types';
import { getDbCluster } from '../../../api/dbClusterApi';

// TODO return
export const useDeleteDbCluster = () => {
  const { id } = useSelectedKubernetesCluster();
  const { dbClusterName } = useSelectedDBCluster();

  useQuery<DbCluster>('dbCluster', () => getDbCluster(id, dbClusterName));
  return useQuery<DbCluster>('dbCluster', () =>
    getDbCluster(id, dbClusterName)
  );
};
