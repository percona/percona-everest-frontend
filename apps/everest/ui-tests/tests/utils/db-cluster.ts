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

import { APIRequestContext, expect } from '@playwright/test';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { DbCluster, ProxyExposeType, Schedule } from '../../../types/dbCluster.types';
import { dbTypeToDbEngine } from '../../../utils/db';
import { DbWizardType } from '../../../pages/database-form/database-form.types';
import { getEnginesVersions } from './database-engines';
import { getK8sClusters } from './k8s-clusters';
import { getClusterDetailedInfo } from './storage-class';

export const createDbClusterFn = async (
  request: APIRequestContext,
  // TODO change type to DbWizardType after https://jira.percona.com/browse/EVEREST-485
  customOptions?: Partial<DbWizardType & {
    schedules: Schedule[];
  }>,
  kubernetesId?: string
) => {
  const k8sClusterId = kubernetesId || (await getK8sClusters(request))[0].id;
  const dbEngines = await getEnginesVersions(request, k8sClusterId);
  const dbType = customOptions?.dbType as DbType || DbType.Mysql;
  const dbEngineType = dbTypeToDbEngine(dbType);
  const dbTypeVersions = dbEngines[dbEngineType];
  const dbClusterInfo = await getClusterDetailedInfo(request, k8sClusterId);
  const storageClassNames = dbClusterInfo?.storageClassNames[0];
  const lastVersion = dbTypeVersions[dbTypeVersions.length - 1];

  // const payload: DbCluster = {
  //         proxy: {
  //             replicas: +customOptions?.numberOfNodes || 1,
  //             expose: {
  //                 type:
  //                     customOptions?.externalAccess || false
  //                         ? ProxyExposeType.external
  //                         : ProxyExposeType.internal,
  //                 ...(!!(customOptions?.externalAccess || false) &&
  //                     (customOptions?.sourceRange || ['181.170.213.40']) && {
  //                         ipSourceRanges: [customOptions?.sourceRange] || [
  //                             '181.170.213.40',
  //                         ],
  //                     }),
  //             },
  //         },
  //     },
  // };

  const payload: DbCluster = {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: {
      name: customOptions?.dbName as string || 'db-cluster-test-ui',
    },
    spec: {
      backup: {
        enabled: customOptions?.backupsEnabled as boolean || false,
        ...(customOptions?.backupsEnabled && {
          schedules: customOptions?.schedules,
        }),
      },
      engine: {
        type: dbEngineType,
        version: customOptions?.dbVersion || lastVersion,
        replicas: +(customOptions?.numberOfNodes || 1),
        resources: {
          cpu: `${customOptions?.cpu || 1}`,
          memory: `${customOptions?.memory || 2}G`,
        },
        storage: {
          class: customOptions?.storageClass! || storageClassNames,
          size: `${customOptions?.disk || 25}G`,
        },
        // TODO return engineParams to tests
        // config: dbPayload.engineParametersEnabled
        //     ? dbPayload.engineParameters
        //     : '',
      },
      // TODO return monitoring to tests
      monitoring: {
        // ...(!!dbPayload.monitoring && {
        //     monitoringConfigName:
        //         typeof dbPayload.monitoringInstance === 'string'
        //             ? dbPayload.monitoringInstance
        //             : dbPayload?.monitoringInstance!.name,
        // }),
      },
      proxy: {
        replicas: +(customOptions?.numberOfNodes || 1),
        expose: {
          type: customOptions?.externalAccess
            ? ProxyExposeType.external
            : ProxyExposeType.internal,
          ...(!!customOptions?.externalAccess &&
            customOptions?.sourceRanges && {
              ipSourceRanges: customOptions?.sourceRanges.flatMap((source) =>
                source.sourceRange ? [source.sourceRange] : []
              ),
            }),
        },
      },
      // TODO return for backups tests
      // ...(backupDataSource?.dbClusterBackupName && {
      //     dataSource: {
      //         dbClusterBackupName: backupDataSource.dbClusterBackupName,
      //     },
      // }),
    },
  };

  const response = await request.post(
    `/v1/kubernetes/${k8sClusterId}/database-clusters`,
    {
      data: payload,
    }
  );

  expect(response.ok()).toBeTruthy();
};

export const deleteDbClusterFn = async (
  request: APIRequestContext,
  kubernetesId: string,
  clusterName: string
) => {
  const deleteResponse = await request.delete(
    `/v1/kubernetes/${kubernetesId}/database-clusters/${clusterName}`
  );
  expect(deleteResponse.ok()).toBeTruthy();
};
