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
import { DbCluster, ProxyExposeType } from '../../types/dbCluster.types';
import { dbEngineToDbType } from '../../utils/db';
import {
  matchFieldsValueToResourceSize,
  removeMeasurementValue,
} from './steps/second/second-step.utils';
import { DB_WIZARD_DEFAULTS } from './database-form.constants';

export const DbClusterPayloadToFormValues = (
  dbCluster: DbCluster
): DbWizardType => ({
  // TODO should be returned with backups
  // [DbWizardFormFields.backupsEnabled]: true,
  // [DbWizardFormFields.pitrEnabled]: true,
  // [DbWizardFormFields.pitrTime]: '60',
  // [DbWizardFormFields.storageLocation]: '',
  // [DbWizardFormFields.selectedTime]: TimeValue.hours,
  // [DbWizardFormFields.minute]: 0,
  // [DbWizardFormFields.hour]: 12,
  // [DbWizardFormFields.amPm]: AmPM.AM,
  // [DbWizardFormFields.weekDay]: WeekDays.Mo,
  // [DbWizardFormFields.onDay]: 1,
  [DbWizardFormFields.dbType]: dbEngineToDbType(dbCluster?.spec?.engine?.type),
  [DbWizardFormFields.dbName]: dbCluster?.metadata?.name,
  [DbWizardFormFields.dbVersion]: dbCluster?.spec?.engine?.version || '',
  [DbWizardFormFields.externalAccess]:
    dbCluster?.spec?.proxy?.expose?.type === ProxyExposeType.external,
  // [DbWizardFormFields.internetFacing]: true, //TODO commented
  [DbWizardFormFields.sourceRanges]: dbCluster?.spec?.proxy?.expose
    ?.ipSourceRanges
    ? dbCluster?.spec?.proxy?.expose?.ipSourceRanges.map((item) => ({
        sourceRange: item,
      }))
    : [],
  // [DbWizardFormFields.monitoring]: dbCluster?.spec?.monitoring?.enabled,
  // [DbWizardFormFields.endpoint]: dbCluster?.spec?.monitoring?.enabled?.pmm?.publicAddress,
  [DbWizardFormFields.numberOfNodes]:
    `${dbCluster?.spec?.proxy?.replicas}` as unknown as NumberOfNodes,
  [DbWizardFormFields.resourceSizePerNode]:
    matchFieldsValueToResourceSize(dbCluster),
  [DbWizardFormFields.cpu]: +dbCluster?.spec?.engine?.resources?.cpu || 0,
  [DbWizardFormFields.disk]: removeMeasurementValue(
    dbCluster?.spec?.engine?.storage?.size.toString()
  ),
  [DbWizardFormFields.memory]: removeMeasurementValue(
    dbCluster?.spec?.engine?.resources?.memory.toString()
  ),
});

export const useDatabasePageDefaultValues = (
  mode: DbWizardMode
): {
  defaultValues: DbWizardType;
  dbClusterData: DbCluster;
  dbClusterStatus: 'error' | 'idle' | 'loading' | 'success';
} => {
  const { state } = useLocation();
  const { data, status } = useDbCluster(
    state?.selectedDbCluster,
    mode === 'edit' && !!state?.selectedDbCluster
  );

  const [defaultValues, setDefaultValues] = useState<DbWizardType>(
    mode === 'new'
      ? DB_WIZARD_DEFAULTS
      : status === 'success'
      ? DbClusterPayloadToFormValues(data)
      : { [DbWizardFormFields.dbVersion]: '' }
  );

  useEffect(() => {
    if (mode === 'edit') {
      if (status === 'success')
        setDefaultValues(DbClusterPayloadToFormValues(data));
    } else setDefaultValues(DB_WIZARD_DEFAULTS);
  }, [data]);

  return { defaultValues, dbClusterData: data, dbClusterStatus: status };
};
