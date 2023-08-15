// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { useContext, useCallback } from 'react';
import { useQueries } from 'react-query';
import { getDbClustersFn } from '../../../api/dbClusterApi';
import { K8Context } from '../../../contexts/kubernetes/kubernetes.context';
import { KubernetesCluster } from '../../../types/kubernetes.types';
import { DbClusterTableElement } from './dbCluster.type';
import {
  DbCluster,
  DbClusterStatus,
  DbClusterAPI,
} from '../../../types/dbCluster.types';

export const DB_CLUSTERS_QUERY_KEY = 'dbClusters';
const mapRawDataToDbClusterModel = (
  payload: ExtraDbCluster[]
): DbClusterTableElement[] => {
  return payload.flatMap(({ dbCluster: item, k8sClusterName }) => {
    try {
      const newElement: DbClusterTableElement = {
        status: item.status ? item.status.status : DbClusterStatus.unknown,
        dbType: item.spec.engine.type,
        dbVersion: item.spec.engine.version || '',
        backupsEnabled: !!item.spec.backup?.enabled,
        databaseName: item.metadata.name,
        kubernetesCluster: k8sClusterName,
        cpu: item.spec.engine.resources?.cpu || '',
        memory: item.spec.engine.resources?.memory || '',
        storage: item.spec.engine.storage.size,
        hostName: item.status ? item.status.hostname : '',
        exposetype: item.spec.proxy.expose.type,
        port: item.status?.port,
      };

      return [newElement];
    } catch {
      // Better safe than sorry
      // If anything breaks because a field's missing, just remove the element from the results
      return [];
    }
  });
};

export interface ExtraDbCluster {
  dbCluster: DbClusterAPI;
  k8sClusterName: string;
}
const combineK8sClusterWithDbCluster = (
  dbCluster: DbClusterAPI,
  k8sCluster: KubernetesCluster
): ExtraDbCluster => ({
  dbCluster,
  k8sClusterName: k8sCluster.name,
});

export const useDbClusters = () => {
  const { clusters } = useContext(K8Context);
  const clusterData = clusters?.data ?? [];
  const userQueries = useQueries<ExtraDbCluster[]>(
    clusterData.map(
      (cluster) => {
        return {
          queryKey: [DB_CLUSTERS_QUERY_KEY, cluster.id],
          queryFn: async () => {
            const response = await getDbClustersFn(cluster.id);

            return (response?.items || []).flatMap((item: DbCluster) =>
              combineK8sClusterWithDbCluster(item, cluster)
            );
          },
        };
      },
      { enabled: clusters?.data }
    )
  );

  const loadingAllClusters = userQueries.every((cluster) => cluster.isLoading);

  const errorInSomeClusters = userQueries.some((cluster) => cluster.error);

  const combinedDataForTable: DbClusterTableElement[] = userQueries
    .map((cluster) =>
      mapRawDataToDbClusterModel((cluster?.data as ExtraDbCluster[]) || [])
    )
    .flat() as DbClusterTableElement[];

  const combinedDbClusters: DbCluster[] = userQueries
    .map((cluster) =>
      ((cluster?.data as ExtraDbCluster[]) ?? []).map((item) => item.dbCluster)
    )
    .flat() as DbCluster[];

  return {
    combinedDataForTable,
    loadingAllClusters,
    errorInSomeClusters,
    combinedDbClusters,
  };
};
