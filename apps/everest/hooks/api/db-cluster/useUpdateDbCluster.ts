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

import { UseMutationOptions, useMutation } from 'react-query';
import { DbWizardType } from '../../../pages/database-form/database-form.types';
import { updateDbClusterFn } from '../../../api/dbClusterApi';
import { DbCluster, ProxyExposeType } from '../../../types/dbCluster.types';
// import {getCronExpressionFromFormValues} from "../../components/time-selection/time-selection.utils";
// import {TimeValue, WeekDays} from "../../components/time-selection/time-selection.types";

type UpdateDbClusterArgType = {
  dbPayload: DbWizardType;
  k8sClusterId: string;
  dbCluster: DbCluster;
};

const formValuesToPayloadOverrides = (
  dbPayload: DbWizardType,
  dbCluster: DbCluster
): DbCluster => {
  // const { selectedTime, minute, hour, amPm, onDay, weekDay } = dbPayload;
  // const backupSchedule = getCronExpressionFromFormValues({selectedTime, minute, hour, amPm, onDay, weekDay});

  return {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: dbCluster.metadata,
    spec: {
      // backup: {
      //   ...dbCluster.backup,
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
        ...dbCluster.spec.engine,
        version: dbPayload.dbVersion,
        replicas: +dbPayload.numberOfNodes,
        resources: {
          ...dbCluster.spec.engine.resources,
          cpu: dbPayload.cpu,
          memory: dbPayload.memory,
        },
        storage: {
          ...dbCluster.spec.engine.storage,
          size: dbPayload.disk,
        },
      },
      // monitoring: {
      //   ...dbCluster.spec.monitoring,
      //   enabled: dbPayload.monitoring,
      //   ...(!!dbPayload.monitoring && {
      //     pmm: {
      //       publicAddress: dbPayload.endpoint || '',
      //     }
      //   })
      // },
      proxy: {
        ...dbCluster.spec.proxy,
        replicas: +dbPayload.numberOfNodes,
        expose: {
          ...dbCluster.spec.proxy.expose,
          type: dbPayload.externalAccess
            ? ProxyExposeType.external
            : ProxyExposeType.internal,
          ...(!!dbPayload.externalAccess &&
            dbPayload.sourceRanges && {
              ipSourceRanges: dbPayload.sourceRanges.flatMap((source) => source.sourceRange ? [source.sourceRange] : []),
            }),
        },
      },
    },
  };
};

export const useUpdateDbCluster = (
  options?: UseMutationOptions<any, unknown, UpdateDbClusterArgType, unknown>
) => {
  return useMutation(
    ({ dbPayload, k8sClusterId, dbCluster }: UpdateDbClusterArgType) => {
      const dbClusterName = dbCluster?.metadata?.name;
      const payload = formValuesToPayloadOverrides(dbPayload, dbCluster);
      return updateDbClusterFn(k8sClusterId, dbClusterName, payload);
    },
    { ...options }
  );
};
