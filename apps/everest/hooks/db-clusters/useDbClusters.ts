import { useContext } from 'react';
import { useQueries } from 'react-query';
import { getDbClusters } from '../../api/dbClusterApi';
import { K8Context } from '../../contexts/kubernetes/kubernetes.context';
import { KubernetesCluster } from '../../types/kubernetes.types';
import { DbCluster, DbClusterRaw, DbClusterStatus } from './dbCluster.type';

const mapRawDataToDbClusterModel = (
  items: DbClusterRaw[],
  cluster: KubernetesCluster
): DbCluster[] => {
  return items.flatMap((item) => {
    try {
      return {
        status: item.status ? item.status.status : DbClusterStatus.unknown,
        dbType: item.spec.engine.type,
        dbVersion: item.spec.engine.version,
        backupsEnabled: !!item.spec.backup?.enabled,
        databaseName: item.metadata.name,
        kubernetesCluster: cluster.name,
        cpu: item.spec.engine.resources.cpu,
        memory: item.spec.engine.resources.memory,
        storage: item.spec.engine.storage.size,
        hostName: item.status ? item.status.hostname : '',
        exposetype: item.spec.proxy.expose.type,
      }
    } catch {
      // Better safe than sorry
      // If anything breaks because a field's missing, just remove the element from the results
      return [];
    }
  });
};

export const useDbClusters = () => {
  const { clusters } = useContext(K8Context);
  const clusterData = clusters?.data ?? [];
  const userQueries = useQueries<DbCluster[]>(
    clusterData.map(
      (cluster) => {
        return {
          queryKey: ['dbClusters', cluster.id],
          queryFn: async () => {
            const { items = [] } = await getDbClusters(cluster.id);

            return mapRawDataToDbClusterModel(items, cluster);
          },
        };
      },
      { enabled: clusters?.data }
    )
  );

  const loadingAllClusters = userQueries.every((cluster) => cluster.isLoading);

  const errorInSomeClusters = userQueries.some((cluster) => cluster.error);

  const combinedData = userQueries
    .map((cluster) => {
      return cluster?.data ?? [];
    })
    .flat() as DbCluster[];

  return { combinedData, loadingAllClusters, errorInSomeClusters };
};
