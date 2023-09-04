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

import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import {
  createDbClusterFn,
  getDbClusterCredentialsFn,
} from '../../../api/dbClusterApi';
import { DbWizardType } from '../../../pages/database-form/database-form.types';
import {
  ClusterCredentials,
  DataSource,
  DbCluster,
  GetDbClusterCredentialsPayload,
  ProxyExposeType,
} from '../../../types/dbCluster.types';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
// import { getCronExpressionFromFormValues } from '../../../components/time-selection/time-selection.utils';
import { dbTypeToDbEngine } from '../../../utils/db';
// import {TimeValue, WeekDays} from "../../components/time-selection/time-selection.types";

type CreateDbClusterArgType = {
  dbPayload: DbWizardType;
  id: string;
  backupDataSource?: DataSource;
};

const formValuesToPayloadMapping = (
  dbPayload: DbWizardType,
  backupDataSource?: DataSource
): DbCluster => {
  // const { selectedTime, minute, hour, amPm, onDay, weekDay } = dbPayload;
  // const backupSchedule = getCronExpressionFromFormValues({
  //   selectedTime,
  //   minute,
  //   hour,
  //   amPm,
  //   onDay,
  //   weekDay,
  // });

  // TODO re-add payload after API is ready
  const dbClusterPayload: DbCluster = {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: {
      name: dbPayload.dbName,
    },
    spec: {
      // backup: {
      //   enabled: dbPayload.backupsEnabled,
      //   ...(dbPayload.backupsEnabled && {
      //     schedules: [
      //       {
      //         enabled: true,
      //         name: '',
      //         backupStorageName:
      //           typeof dbPayload.storageLocation === 'string'
      //             ? dbPayload.storageLocation
      //             : dbPayload.storageLocation!.name,
      //         schedule: backupSchedule,
      //       },
      //     ],
      //   }),
      // },
      engine: {
        type: dbTypeToDbEngine(dbPayload.dbType),
        version: dbPayload.dbVersion,
        replicas: +dbPayload.numberOfNodes,
        resources: {
          cpu: dbPayload.cpu,
          memory: `${dbPayload.memory}G`,
        },
        storage: {
          class: dbPayload.storageClass!,
          size: `${dbPayload.disk}G`,
        },
        config: dbPayload.engineParametersEnabled
          ? dbPayload.engineParameters
          : '',
      },
      monitoring: {
        ...(!!dbPayload.monitoring && {
          monitoringConfigName:
            typeof dbPayload.monitoringInstance === 'string'
              ? dbPayload.monitoringInstance
              : dbPayload?.monitoringInstance!.name,
        }),
      },
      proxy: {
        replicas: +dbPayload.numberOfNodes,
        expose: {
          type: dbPayload.externalAccess
            ? ProxyExposeType.external
            : ProxyExposeType.internal,
          ...(!!dbPayload.externalAccess &&
            dbPayload.sourceRanges && {
              ipSourceRanges: dbPayload.sourceRanges.flatMap((source) =>
                source.sourceRange ? [source.sourceRange] : []
              ),
            }),
        },
      },
      ...(backupDataSource?.dbClusterBackupName && {
        dataSource: {
          dbClusterBackupName: backupDataSource.dbClusterBackupName,
        },
      }),
    },
  };

  return dbClusterPayload;
};

export const useCreateDbCluster = (
  options?: UseMutationOptions<any, unknown, CreateDbClusterArgType, unknown>
) => {
  return useMutation(
    ({ dbPayload, id, backupDataSource }: CreateDbClusterArgType) =>
      createDbClusterFn(
        formValuesToPayloadMapping(dbPayload, backupDataSource),
        id
      ),
    { ...options }
  );
};

export const useDbClusterCredentials = (
  dbClusterName: string,
  options?: UseQueryOptions<ClusterCredentials>
) => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<GetDbClusterCredentialsPayload, unknown, ClusterCredentials>(
    `cluster-credentials-${dbClusterName}`,
    () => getDbClusterCredentialsFn(id, dbClusterName),
    { ...options }
  );
};
