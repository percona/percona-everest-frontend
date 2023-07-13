import { useContext } from 'react';
import { useQueries } from 'react-query';
import { getDbClusters } from '../../api/dbClusterApi';
import { K8Context } from '../../contexts/kubernetes/kubernetes.context';
import { KubernetesCluster } from '../../types/kubernetes.types';
import { DbCluster, DbClusterRaw, DbTypeIcon } from './dbCluster.type';

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

const mapRawDataToDbClusterModel = (
  items: DbClusterRaw[],
  cluster: KubernetesCluster
): DbCluster[] => {
  return items.map((item) => ({
    status: item.status.status,
    dbTypeIcon: item.spec.databaseType,
    dbVersion: extractVersionFromDbImage(
      item.spec.databaseType,
      item.spec.databaseImage
    ),
    backupsEnabled: item.spec.backups?.enabled ?? false,
    databaseName: item.metadata.name,
    kubernetesCluster: cluster.name,
  }));
};

const extractVersionFromDbImage = (dbType: DbTypeIcon, dbImageText: string) => {
  let regex = /:(.*?)-/;

  if (dbType === DbTypeIcon.postgresql) {
    regex = /-ppg(\d+)-/;
  }

  const match = regex.exec(dbImageText);
  return match ? match[1] : null;
};
