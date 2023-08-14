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
  UseMutationOptions,
  UseQueryOptions,
  useMutation,
  useQuery,
} from 'react-query';
import {
  ClusterCredentials,
  DbCluster,
  GetDbClusterCredentialsPayload,
  ProxyExposeType,
} from '../../../types/dbCluster.types';
import { dbTypeToDbEngine } from '../../../utils/db';
import {
  createDbClusterFn,
  getDbClusterCredentialsFn,
} from '../../../api/dbClusterApi';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
import { DbWizardType } from '../../../pages/database-form/database-form.types';
// import {getCronExpressionFromFormValues} from "../../components/time-selection/time-selection.utils";
// import {TimeValue, WeekDays} from "../../components/time-selection/time-selection.types";

type CreateDbClusterArgType = { dbPayload: DbWizardType; id: string };

const formValuesToPayloadMapping = (dbPayload: DbWizardType): DbCluster => {
  // const { selectedTime, minute, hour, amPm, onDay, weekDay } = dbPayload;
  // const backupSchedule = getCronExpressionFromFormValues({selectedTime, minute, hour, amPm, onDay, weekDay});

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
      //         objectStorageName: '',
      //         schedule: backupSchedule, // TODO CRON Expression
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
          size: `${dbPayload.disk}G`,
        },
      },
      // monitoring: {
      //   enabled: dbPayload.monitoring,
      //   ...(!!dbPayload.monitoring && {
      //     pmm: {
      //       publicAddress: dbPayload.endpoint || '',
      //     }
      //   })
      // },
      proxy: {
        replicas: +dbPayload.numberOfNodes,
        expose: {
          type: dbPayload.externalAccess
            ? ProxyExposeType.external
            : ProxyExposeType.internal,
          ...(!!dbPayload.externalAccess &&
            dbPayload.sourceRange && {
              ipSourceRanges: [dbPayload.sourceRange],
            }),
        },
      },
    },
  };

  return dbClusterPayload;
};

export const useCreateDbCluster = (
  options?: UseMutationOptions<any, unknown, CreateDbClusterArgType, unknown>
) => {
  return useMutation(
    ({ dbPayload, id }: CreateDbClusterArgType) =>
      createDbClusterFn(formValuesToPayloadMapping(dbPayload), id),
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