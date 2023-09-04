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

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DbWizardFormFields,
  DbWizardMode,
  DbWizardType,
} from './database-form.types';
import { useDbCluster } from '../../hooks/api/db-cluster/useDbCluster';
import { NumberOfNodes } from './steps/second/second-step.types';
import {
  // Backup,
  DbCluster,
  ProxyExposeType,
} from '../../types/dbCluster.types';
import { dbEngineToDbType } from '../../utils/db';
import {
  matchFieldsValueToResourceSize,
  removeMeasurementValue,
} from './steps/second/second-step.utils';
import {
  DB_WIZARD_DEFAULTS,
  // TIME_SELECTION_DEFAULTS,
} from './database-form.constants';
import { useMonitoringInstancesList } from '../../hooks/api/monitoring/useMonitoringInstancesList';
import {
  MonitoringInstance,
  MonitoringInstanceList,
} from '../../types/monitoring.types';
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
    if (monitoringInstance) return monitoringInstance;
    return '';
  }
  return '';
};

export const DbClusterPayloadToFormValues = (
  dbCluster: DbCluster,
  monitoringInstances: MonitoringInstanceList
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
    [DbWizardFormFields.dbName]: dbCluster?.metadata?.name,
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
    [DbWizardFormFields.numberOfNodes]:
      `${dbCluster?.spec?.proxy?.replicas}` as unknown as NumberOfNodes,
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

export const useDatabasePageDefaultValues = (
  mode: DbWizardMode
): {
  defaultValues: DbWizardType;
  dbClusterData: DbCluster | undefined;
  dbClusterStatus: 'error' | 'idle' | 'loading' | 'success';
} => {
  const { state } = useLocation();
  const { data, status } = useDbCluster(
    state?.selectedDbCluster,
    (mode === 'edit' || mode === 'restoreFromBackup') &&
      !!state?.selectedDbCluster
  );
  const { data: monitoringInstances } =
    useMonitoringInstancesList(mode === 'edit');

  const [defaultValues, setDefaultValues] = useState<DbWizardType>(
    mode === 'new'
      ? DB_WIZARD_DEFAULTS
      : status === 'success'
      ? DbClusterPayloadToFormValues(data, monitoringInstances)
      : { ...DB_WIZARD_DEFAULTS, [DbWizardFormFields.dbVersion]: '' }
  );

  useEffect(() => {
    if (mode === 'edit' || mode === 'restoreFromBackup') {
      if (status === 'success')
        setDefaultValues(
          DbClusterPayloadToFormValues(data, monitoringInstances)
        );
    } else setDefaultValues(DB_WIZARD_DEFAULTS);
  }, [data, monitoringInstances]);

  return { defaultValues, dbClusterData: data, dbClusterStatus: status };
};
