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
import { DefaultValues } from 'react-hook-form';
import {
  AmPM,
  TimeValue,
  WeekDays,
} from '../../components/time-selection/time-selection.types';
import { DbWizardFormFields, DbWizardType } from './database-form.types';
import { DEFAULT_SIZES } from './steps/second/second-step.const';
import { ResourceSize } from './steps/second/second-step.types';
import { DbType } from '../../../../ui-lib/db-toggle-card';

// TODO re-add steps after API is ready
export const TIME_SELECTION_DEFAULTS = {
  [DbWizardFormFields.selectedTime]: TimeValue.hours,
  [DbWizardFormFields.minute]: 0,
  [DbWizardFormFields.hour]: 12,
  [DbWizardFormFields.amPm]: AmPM.AM,
  [DbWizardFormFields.weekDay]: WeekDays.Mo,
  [DbWizardFormFields.onDay]: 1,
};

export const DB_WIZARD_DEFAULTS: DefaultValues<DbWizardType> = {
  [DbWizardFormFields.backupsEnabled]: true,
  // [DbWizardFormFields.pitrEnabled]: true,
  // [DbWizardFormFields.pitrTime]: '60',
  [DbWizardFormFields.storageLocation]: null,
  ...TIME_SELECTION_DEFAULTS,
  [DbWizardFormFields.dbType]: '' as DbType,
  [DbWizardFormFields.dbName]: '',
  [DbWizardFormFields.dbVersion]: '',
  [DbWizardFormFields.storageClass]: '',
  [DbWizardFormFields.externalAccess]: false,
  // [DbWizardFormFields.internetFacing]: true,
  [DbWizardFormFields.sourceRanges]: [{ sourceRange: '' }],
  [DbWizardFormFields.engineParametersEnabled]: false,
  [DbWizardFormFields.engineParameters]: '',
  [DbWizardFormFields.monitoring]: false,
  [DbWizardFormFields.monitoringInstance]: '',
  [DbWizardFormFields.numberOfNodes]: '1',
  [DbWizardFormFields.resourceSizePerNode]: ResourceSize.small,
  [DbWizardFormFields.cpu]: DEFAULT_SIZES.small.cpu,
  [DbWizardFormFields.disk]: DEFAULT_SIZES.small.disk,
  [DbWizardFormFields.memory]: DEFAULT_SIZES.small.memory,
};
