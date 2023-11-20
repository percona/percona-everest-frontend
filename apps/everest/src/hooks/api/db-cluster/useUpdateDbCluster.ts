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
import { updateDbClusterFn } from 'api/dbClusterApi';
import { DbCluster, ProxyExposeType } from 'shared-types/dbCluster.types';
import { DbWizardType } from 'pages/database-form/database-form-schema.ts';
import { getCronExpressionFromFormValues } from 'components/time-selection/time-selection.utils.ts';
import { generateShortUID } from 'pages/database-form/steps/first/utils.ts';

type UpdateDbClusterArgType = {
  dbPayload: DbWizardType;
  dbCluster: DbCluster;
};

const getSchedules = (
  dbCluster: DbCluster,
  dbPayload: DbWizardType,
  backupSchedule: string
) => {
  const schedules = dbCluster?.spec?.backup?.schedules;
  if (!!schedules && schedules.length > 1) {
    return schedules;
  } else
    return [
      {
        enabled: true,
        name: dbPayload?.scheduleName || `backup-${generateShortUID()}`,
        backupStorageName:
          typeof dbPayload.storageLocation === 'string'
            ? dbPayload.storageLocation
            : dbPayload.storageLocation!.name,
        schedule: backupSchedule,
      },
    ];
};

const formValuesToPayloadOverrides = (
  dbPayload: DbWizardType,
  dbCluster: DbCluster
): DbCluster => {
  const { selectedTime, minute, hour, amPm, onDay, weekDay } = dbPayload;
  const backupSchedule = getCronExpressionFromFormValues({
    selectedTime,
    minute,
    hour,
    amPm,
    onDay,
    weekDay,
  });

  return {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: dbCluster.metadata,
    spec: {
      ...dbCluster?.spec,
      backup: {
        enabled: dbPayload.backupsEnabled,
        ...(dbPayload.backupsEnabled && {
          schedules: getSchedules(dbCluster, dbPayload, backupSchedule),
        }),
      },
      engine: {
        ...dbCluster.spec.engine,
        version: dbPayload.dbVersion,
        replicas: +dbPayload.numberOfNodes,
        resources: {
          ...dbCluster.spec.engine.resources,
          cpu: `${dbPayload.cpu}`,
          memory: `${dbPayload.memory}G`,
        },
        storage: {
          ...dbCluster.spec.engine.storage,
          class: dbPayload.storageClass!,
          size: `${dbPayload.disk}G`,
        },
        config: dbPayload.engineParametersEnabled
          ? dbPayload.engineParameters
          : '',
      },
      monitoring: {
        ...(!!dbPayload.monitoring && {
          monitoringConfigName: dbPayload?.monitoringInstance!,
        }),
      },
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
              ipSourceRanges: dbPayload.sourceRanges.flatMap((source) =>
                source.sourceRange ? [source.sourceRange] : []
              ),
            }),
        },
      },
    },
  };
};

export const useUpdateDbCluster = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    UpdateDbClusterArgType,
    unknown
  >
) => {
  return useMutation(
    ({ dbPayload, dbCluster }: UpdateDbClusterArgType) => {
      const dbClusterName = dbCluster?.metadata?.name;
      const payload = formValuesToPayloadOverrides(dbPayload, dbCluster);
      return updateDbClusterFn(dbClusterName, payload);
    },
    { ...options }
  );
};
