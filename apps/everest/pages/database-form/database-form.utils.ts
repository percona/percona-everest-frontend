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

import { format } from 'date-fns';
import { DbCluster, ProxyExposeType } from '../../types/dbCluster.types';
import {
  MonitoringInstance,
  MonitoringInstanceList,
} from '../../types/monitoring.types';
import {
  DbWizardFormFields,
  DbWizardMode,
  DbWizardType,
} from './database-form.types';
import { dbEngineToDbType } from '../../utils/db';
import {
  matchFieldsValueToResourceSize,
  removeMeasurementValue,
} from './steps/second/second-step.utils';
import { FILENAME_TIMESTAMP_FORMAT } from '../../constants';
// import { getFormValuesFromCronExpression } from '../../components/time-selection/time-selection.utils';

// EVEREST-334
// const getBackupInfo = (backup: Backup) => {
//   if (backup?.enabled) {
//     const schedules = backup?.schedules;
//     const firstSchedule = schedules && schedules[0];
//     if (firstSchedule.schedule) {
//       return {
//         ...getFormValuesFromCronExpression(firstSchedule.schedule),
//         [DbWizardFormFields.storageLocation]:
//           { name: firstSchedule.backupStorageName } || null,
//       };
//     }
//   }
//   return {
//     ...TIME_SELECTION_DEFAULTS,
//     [DbWizardFormFields.storageLocation]:
//       DB_WIZARD_DEFAULTS[DbWizardFormFields.storageLocation],
//   };
// };

const getMonitoringInstanceValue = (
  monitoringInstances: MonitoringInstanceList,
  instanceName: string
): MonitoringInstance | '' => {
  if (monitoringInstances?.length) {
    const monitoringInstance = monitoringInstances.find(
      (item) => item.name === instanceName
    );
    if (monitoringInstance) {
      return monitoringInstance;
    }
    return '';
  }
  return '';
};
export const DbClusterPayloadToFormValues = (
  dbCluster: DbCluster,
  monitoringInstances: MonitoringInstanceList,
  mode: DbWizardMode
): DbWizardType => {
  // const backupInfo = getBackupInfo(dbCluster?.spec?.backup); // EVEREST-334

  return {
    // [DbWizardFormFields.backupsEnabled]: dbCluster?.spec?.backup?.enabled, // EVEREST-334
    // [DbWizardFormFields.pitrEnabled]: true,
    // [DbWizardFormFields.pitrTime]: '60',
    // ...backupInfo, // EVEREST-334
    [DbWizardFormFields.dbType]: dbEngineToDbType(
      dbCluster?.spec?.engine?.type
    ),
    [DbWizardFormFields.dbName]:
      mode === 'restoreFromBackup'
        ? `restored-${dbCluster?.metadata?.name}-${format(
            new Date(),
            FILENAME_TIMESTAMP_FORMAT
          )}`
        : dbCluster?.metadata?.name,
    [DbWizardFormFields.dbVersion]: dbCluster?.spec?.engine?.version || '',
    [DbWizardFormFields.externalAccess]:
      dbCluster?.spec?.proxy?.expose?.type === ProxyExposeType.external,
    // [DbWizardFormFields.internetFacing]: true,
    [DbWizardFormFields.engineParametersEnabled]:
      !!dbCluster?.spec?.engine?.config,
    [DbWizardFormFields.engineParameters]: dbCluster?.spec?.engine?.config,
    [DbWizardFormFields.sourceRanges]: dbCluster?.spec?.proxy?.expose
      ?.ipSourceRanges
      ? dbCluster?.spec?.proxy?.expose?.ipSourceRanges.map((item) => ({
          sourceRange: item,
        }))
      : [],
    [DbWizardFormFields.monitoring]:
      !!dbCluster?.spec?.monitoring?.monitoringConfigName,
    [DbWizardFormFields.monitoringInstance]: getMonitoringInstanceValue(
      monitoringInstances,
      dbCluster?.spec?.monitoring?.monitoringConfigName
    ),
    [DbWizardFormFields.numberOfNodes]: `${dbCluster?.spec?.proxy?.replicas}`,
    [DbWizardFormFields.resourceSizePerNode]:
      matchFieldsValueToResourceSize(dbCluster),
    [DbWizardFormFields.cpu]: +(dbCluster?.spec?.engine?.resources?.cpu || 0),
    [DbWizardFormFields.disk]: removeMeasurementValue(
      dbCluster?.spec?.engine?.storage?.size.toString()
    ),
    [DbWizardFormFields.memory]: removeMeasurementValue(
      (dbCluster?.spec?.engine?.resources?.memory || 0).toString()
    ),
    [DbWizardFormFields.storageClass]:
      dbCluster?.spec?.engine?.storage?.class || null,
  };
};
