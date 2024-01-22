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

import { AutoCompleteInput, LabeledContent, TextInput } from '@percona/ui-lib';
import { BackupStorage } from 'shared-types/backupStorages.types.ts';
import { Schedule } from 'shared-types/dbCluster.types.ts';
import { AutoCompleteAutoFill } from '../auto-complete-auto-fill/auto-complete-auto-fill.tsx';
import { TimeSelection } from '../time-selection/time-selection';
import { Messages } from './schedule-form.messages.ts';
import { ScheduleFormFields } from './schedule-form.types.ts';

type ScheduleFormProps = {
  allowScheduleSelection?: boolean;
  allowStorageSelection?: boolean;
  disableNameInput?: boolean;
  autoFillLocation?: boolean;
  schedules: Schedule[];
  storageLocationFetching: boolean;
  storageLocationOptions: BackupStorage[];
};
export const ScheduleForm = ({
  allowScheduleSelection,
  allowStorageSelection = true,
  disableNameInput,
  autoFillLocation,
  schedules,
  storageLocationFetching,
  storageLocationOptions,
}: ScheduleFormProps) => {
  const schedulesNamesList =
    (schedules && schedules.map((item) => item?.name)) || [];
  return (
    <>
      {allowScheduleSelection ? (
        <AutoCompleteInput
          name={ScheduleFormFields.scheduleName}
          label={Messages.scheduleName.label}
          options={schedulesNamesList}
          isRequired
        />
      ) : (
        <TextInput
          name={ScheduleFormFields.scheduleName}
          label={Messages.scheduleName.label}
          textFieldProps={{
            disabled: disableNameInput,
          }}
          isRequired
        />
      )}
      <LabeledContent label="Repeats">
        <TimeSelection showInfoAlert />
      </LabeledContent>

      {allowStorageSelection && (
        <AutoCompleteAutoFill
          name={ScheduleFormFields.storageLocation}
          label={Messages.storageLocation.label}
          loading={storageLocationFetching}
          options={storageLocationOptions}
          autoCompleteProps={{
            isOptionEqualToValue: (option, value) => option.name === value.name,
            getOptionLabel: (option) =>
              typeof option === 'string' ? option : option.name,
          }}
          isRequired
          enableFillFirst={autoFillLocation}
        />
      )}
    </>
  );
};
