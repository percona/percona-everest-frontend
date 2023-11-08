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

import React from 'react';
import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { LabeledContent } from '@percona/ui-lib.labeled-content';
import { BackupStorage } from '../../types/backupStorages.types';
import { Schedule } from '../../types/dbCluster.types';
import { TimeSelection } from '../time-selection/time-selection';
import { ScheduleFormFields } from './schedule-form.types';
import { Messages } from './schedule-form.messages';

type ScheduleFormProps = {
  mode: 'new' | 'edit';
  schedules: Schedule[];
  storageLocationFetching: boolean;
  storageLocationOptions: BackupStorage[];
};
export const ScheduleForm = ({
  mode,
  schedules,
  storageLocationFetching,
  storageLocationOptions,
}: ScheduleFormProps) => {
  const schedulesNamesList =
    (schedules && schedules.map((item) => item?.name)) || [];

  return (
    <>
      {mode === 'new' && (
        <TextInput
          name={ScheduleFormFields.scheduleName}
          label={Messages.scheduleName.label}
          isRequired
        />
      )}
      {mode === 'edit' && (
        <AutoCompleteInput
          name={ScheduleFormFields.scheduleName}
          label={Messages.scheduleName.label}
          options={schedulesNamesList}
          isRequired
        />
      )}
      <LabeledContent label="Repeats">
        <TimeSelection showInfoAlert />
      </LabeledContent>

      <AutoCompleteInput
        name={ScheduleFormFields.storageLocation}
        label={Messages.storageLocation}
        loading={storageLocationFetching}
        options={storageLocationOptions}
        autoCompleteProps={{
          isOptionEqualToValue: (option, value) => option.name === value.name,
          getOptionLabel: (option) =>
            typeof option === 'string' ? option : option.name,
        }}
        isRequired
      />
    </>
  );
};
