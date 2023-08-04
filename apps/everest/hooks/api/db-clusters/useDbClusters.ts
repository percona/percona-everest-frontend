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
import { useContext } from 'react';
import { useQueries } from 'react-query';
import { getDbClusters } from '../../../api/dbClusterApi';
import { K8Context } from '../../../contexts/kubernetes/kubernetes.context';
import { KubernetesCluster } from '../../../types/kubernetes.types';
import { DbClusterTableElement } from './dbCluster.type';
import {
  DbClusterStatus,
  GetDbClusterPayload,
} from '../../../types/dbCluster.types';

const mapRawDataToDbClusterModel = (
  payload: GetDbClusterPayload,
  cluster: KubernetesCluster
): DbClusterTableElement[] => {
  return (payload.items || []).flatMap((item) => {
    try {
      const newElement: DbClusterTableElement = {
        status: item.status && item.status.status ? item.status.status : DbClusterStatus.unknown,
        dbType: item.spec.engine.type,
        dbVersion: item.spec.engine.version || '',
        backupsEnabled: !!item.spec.backup?.enabled,
        databaseName: item.metadata.name,
        kubernetesCluster: cluster.name,
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

export const useDbClusters = () => {
  const { clusters } = useContext(K8Context);
  const clusterData = clusters?.data ?? [];
  const userQueries = useQueries<DbClusterTableElement[]>(
    clusterData.map(
      (cluster) => {
        return {
          queryKey: ['dbClusters', cluster.id],
          queryFn: async () => {
            const response = await getDbClusters(cluster.id);

            return mapRawDataToDbClusterModel(response, cluster);
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
    .flat() as DbClusterTableElement[];

  return { combinedData, loadingAllClusters, errorInSomeClusters };
};
