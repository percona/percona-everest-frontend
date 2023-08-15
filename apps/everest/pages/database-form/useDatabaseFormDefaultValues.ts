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
import { matchFieldsValueToResourceSize } from './steps/second/second-step.utils';
import { DB_WIZARD_DEFAULTS } from './database-form.constants';

const removeMeasurementValue = (value: string) =>
  value ? +value?.slice(0, -1) : 0;
export const DbClusterPayloadToFormValues = (
  dbCluster: DbCluster
): DbWizardType => ({
  // TODO commented
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
  // TODO commented
  [DbWizardFormFields.dbType]: dbEngineToDbType(dbCluster?.spec?.engine?.type),
  [DbWizardFormFields.dbName]: dbCluster?.metadata?.name,
  [DbWizardFormFields.dbVersion]: dbCluster?.spec?.engine?.version || '',
  [DbWizardFormFields.externalAccess]:
    dbCluster?.spec?.proxy?.expose?.type === ProxyExposeType.external,
  // [DbWizardFormFields.internetFacing]: true, //TODO commented
  [DbWizardFormFields.sourceRange]:
    dbCluster?.spec?.proxy?.expose?.ipSourceRanges?.[0] || '', // TODO multi sourceRanges
  [DbWizardFormFields.monitoring]: false,
  // [DbWizardFormFields.endpoint]: '', //TODO commented
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
