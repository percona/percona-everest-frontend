import { DbType } from '@percona/ui-lib.db-toggle-card';
import { DbWizardFormFields } from './new-database.types';
import { DEFAULT_SIZES } from './steps/second/second-step.const';
import { NumberOfNodes, ResourceSize } from './steps/second/second-step.types';
import {
  AmPM,
  TimeValue,
  WeekDays,
} from '../../components/time-selection/time-selection.types';
import { StorageType } from '../../types/backupStorages.types';

export const DB_WIZARD_DEFAULTS = {
  [DbWizardFormFields.backupsEnabled]: true,
  // [DbWizardFormFields.pitrEnabled]: true,
  // [DbWizardFormFields.pitrTime]: '60',
  [DbWizardFormFields.storageLocation]: StorageType.S3, // TODO api
  [DbWizardFormFields.timeNumbers]: '1',
  [DbWizardFormFields.selectTime]: TimeValue.hours,
  [DbWizardFormFields.minute]: 0,
  [DbWizardFormFields.hour]: 12,
  [DbWizardFormFields.amPm]: AmPM.AM,
  [DbWizardFormFields.weekDay]: WeekDays.Mo,
  [DbWizardFormFields.onDay]: 1,
  [DbWizardFormFields.dbType]: DbType.Mysql,
  [DbWizardFormFields.dbName]: '',
  [DbWizardFormFields.dbVersion]: '',
  [DbWizardFormFields.externalAccess]: false,
  [DbWizardFormFields.internetFacing]: true,
  [DbWizardFormFields.sourceRange]: '',
  [DbWizardFormFields.monitoring]: false,
  [DbWizardFormFields.endpoint]: '',
  [DbWizardFormFields.numberOfNodes]: NumberOfNodes.oneNode,
  [DbWizardFormFields.resourceSizePerNode]: ResourceSize.small,
  [DbWizardFormFields.cpu]: DEFAULT_SIZES.small.cpu,
  [DbWizardFormFields.disk]: DEFAULT_SIZES.small.disk,
  [DbWizardFormFields.memory]: DEFAULT_SIZES.small.memory,
};
