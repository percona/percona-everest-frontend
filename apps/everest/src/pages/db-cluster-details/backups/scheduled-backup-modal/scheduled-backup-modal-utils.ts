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

import { Schedule } from 'shared-types/dbCluster.types';
import {
  ScheduleFields,
  ScheduleFormData,
} from './scheduled-backup-modal-form/scheduled-backup-modal-form.types';
import { generateShortUID } from 'pages/database-form/steps/first/utils';
import { TIME_SELECTION_DEFAULTS } from 'pages/database-form/database-form.constants';
import { getFormValuesFromCronExpression } from 'components/time-selection/time-selection.utils';

export const scheduleModalDefaultValues = (
  mode: 'new' | 'edit',
  selectedSchedule: Schedule
): ScheduleFormData => {
  if (mode === 'edit' && selectedSchedule) {
    const { name, backupStorageName, schedule } = selectedSchedule;
    const formValues = getFormValuesFromCronExpression(schedule);
    return {
      [ScheduleFields.name]: name || '',
      [ScheduleFields.storageLocation]: { name: backupStorageName } || null,
      ...formValues,
    };
  }
  return {
    [ScheduleFields.name]: `backup-${generateShortUID()}`,
    [ScheduleFields.storageLocation]: '',
    ...TIME_SELECTION_DEFAULTS,
  };
};
