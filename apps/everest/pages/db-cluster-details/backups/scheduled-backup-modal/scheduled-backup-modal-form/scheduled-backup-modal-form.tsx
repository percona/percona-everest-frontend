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

import React, { useContext, useEffect } from 'react';
import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { LabeledContent } from '@percona/ui-lib.labeled-content';
import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { TimeSelection } from '../../../../../components/time-selection/time-selection';
import { useBackupStorages } from '../../../../../hooks/api/backup-storages/useBackupStorages';
import { useDbCluster } from '../../../../../hooks/api/db-cluster/useDbCluster';
import { Messages } from '../scheduled-backup-modal.messages';
import { ScheduleFields } from '../scheduled-backup-modal.types';
import { ScheduleModalContext } from '../context/schedule-modal.context';

export const ScheduledBackupModalForm = () => {
  const { watch } = useFormContext();
  const { dbClusterName } = useParams();
  const { mode, setSelectedScheduleName } = useContext(ScheduleModalContext);

  const { data: backupStorages = [], isFetching } = useBackupStorages();
  const { data: dbCluster } = useDbCluster(dbClusterName!, {
    enabled: !!dbClusterName && mode === 'edit',
  });

  const schedules =
    (mode === 'edit' && dbCluster && dbCluster?.spec?.backup?.schedules) || [];
  const schedulesNamesList =
    mode === 'edit' && schedules && schedules.map((item) => item?.name);

  const scheduleName = watch(ScheduleFields.name);

  useEffect(() => {
    setSelectedScheduleName(scheduleName);
  }, [scheduleName]);

  return (
    <>
      {mode === 'new' && (
        <TextInput
          name={ScheduleFields.name}
          label={Messages.scheduleName}
          isRequired
        />
      )}
      {mode === 'edit' && (
        <AutoCompleteInput
          name={ScheduleFields.name}
          label={Messages.scheduleName}
          options={schedulesNamesList}
          isRequired
        />
      )}
      <LabeledContent label="Repeats">
        <TimeSelection showInfoAlert />
      </LabeledContent>

      <AutoCompleteInput
        name={ScheduleFields.storageLocation}
        label={Messages.storageLocation}
        loading={isFetching}
        options={backupStorages}
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
