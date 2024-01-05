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
  Backup,
  DbCluster,
  ProxyExposeType,
} from 'shared-types/dbCluster.types';
import { DbWizardFormFields, DbWizardMode } from './database-form.types';
import { dbEngineToDbType } from '@percona/utils';
import { matchFieldsValueToResourceSize } from './steps/resources/resources-step.utils.ts';
import { cpuParser, memoryParser } from 'utils/k8ResourceParser';
import { generateShortUID } from './steps/first/utils';
import { MAX_DB_CLUSTER_NAME_LENGTH } from 'consts';
import { DbWizardType } from './database-form-schema.ts';
import { getFormValuesFromCronExpression } from '../../components/time-selection/time-selection.utils.ts';
import {
  DB_WIZARD_DEFAULTS,
  TIME_SELECTION_DEFAULTS,
} from './database-form.constants.ts';

const getScheduleInfo = (mode: DbWizardMode, backup?: Backup) => {
  if (
    (backup?.enabled && mode === 'new') ||
    mode === 'edit' ||
    mode === 'restoreFromBackup'
  ) {
    const schedules = backup?.schedules;
    const firstSchedule = schedules && schedules[0];

    if (firstSchedule?.schedule && !!schedules && schedules?.length <= 1) {
      return {
        ...getFormValuesFromCronExpression(firstSchedule.schedule),
        [DbWizardFormFields.storageLocation]:
          { name: firstSchedule.backupStorageName } || null,
        [DbWizardFormFields.scheduleName]: firstSchedule.name,
      };
    }
  }
  return {
    ...TIME_SELECTION_DEFAULTS,
    [DbWizardFormFields.storageLocation]:
      DB_WIZARD_DEFAULTS[DbWizardFormFields.storageLocation],
  };
};

export const DbClusterPayloadToFormValues = (
  dbCluster: DbCluster,
  mode: DbWizardMode
): DbWizardType => {
  const backup = dbCluster?.spec?.backup;

  return {
    [DbWizardFormFields.backupsEnabled]: !!backup?.enabled,
    [DbWizardFormFields.scheduleName]: `backup-${generateShortUID()}`,
    [DbWizardFormFields.pitrEnabled]: backup?.pitr?.enabled || false,
    [DbWizardFormFields.pitrStorageLocation]:
      (backup?.pitr?.enabled && mode === 'new') || mode === 'edit'
        ? backup?.pitr?.backupStorageName || null
        : DB_WIZARD_DEFAULTS[DbWizardFormFields.pitrStorageLocation],
    ...getScheduleInfo(mode, backup),
    [DbWizardFormFields.dbType]: dbEngineToDbType(
      dbCluster?.spec?.engine?.type
    ),
    [DbWizardFormFields.dbName]:
      mode === 'restoreFromBackup'
        ? `restored-${dbCluster?.metadata?.name}-${generateShortUID()}`.slice(
            0,
            MAX_DB_CLUSTER_NAME_LENGTH
          )
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
      : [{ sourceRange: '' }],
    [DbWizardFormFields.monitoring]:
      !!dbCluster?.spec?.monitoring?.monitoringConfigName,
    [DbWizardFormFields.monitoringInstance]:
      dbCluster?.spec?.monitoring?.monitoringConfigName || '',
    [DbWizardFormFields.numberOfNodes]: `${dbCluster?.spec?.proxy?.replicas}`,
    [DbWizardFormFields.resourceSizePerNode]:
      matchFieldsValueToResourceSize(dbCluster),
    [DbWizardFormFields.cpu]: cpuParser(
      dbCluster?.spec?.engine?.resources?.cpu.toString() || '0'
    ),
    [DbWizardFormFields.disk]: memoryParser(
      dbCluster?.spec?.engine?.storage?.size.toString()
    ),
    [DbWizardFormFields.memory]: memoryParser(
      (dbCluster?.spec?.engine?.resources?.memory || 0).toString()
    ),
    [DbWizardFormFields.storageClass]:
      dbCluster?.spec?.engine?.storage?.class || null,
  };
};
