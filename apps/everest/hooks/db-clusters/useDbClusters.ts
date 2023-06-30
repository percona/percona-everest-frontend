import { useContext } from 'react';
import { useQueries } from 'react-query';
import { K8Context } from '../../contexts/kubernetes/kubernetes.context';
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
            const result = await fetch(
              `/v1/kubernetes/${cluster.id}/database-clusters`
            );

            if (!result.ok) {
              throw new Error();
            }

            const { items = [] } = await result.json();

            return mapRawDataToDbClusterModel(items, cluster);
          },
        };
      },
      { enabled: clusters?.data }
    )
  );
  console.log(userQueries);
  return userQueries;
};

const mapRawDataToDbClusterModel = (
  items: DbClusterRaw[],
  cluster: any
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
