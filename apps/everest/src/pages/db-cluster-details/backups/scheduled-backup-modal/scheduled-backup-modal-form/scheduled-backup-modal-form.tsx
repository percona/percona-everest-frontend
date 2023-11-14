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

import { useParams } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { useContext, useEffect } from 'react';
import { useBackupStorages } from '../../../../../hooks/api/backup-storages/useBackupStorages.ts';
import { useDbCluster } from '../../../../../hooks/api/db-cluster/useDbCluster.ts';
import { ScheduleFormFields } from '../../../../../components/schedule-form/schedule-form.types.ts';
import { ScheduleForm } from '../../../../../components/schedule-form/schedule-form.tsx';
import { ScheduleModalContext } from '../../backups.context.ts';

export const ScheduledBackupModalForm = () => {
  const { watch } = useFormContext();
  const { dbClusterName } = useParams();
  const { mode, setSelectedScheduleName } = useContext(ScheduleModalContext);

  const { data: backupStorages = [], isFetching } = useBackupStorages();
  const { data: dbCluster } = useDbCluster(dbClusterName!, {
    enabled: !!dbClusterName && mode === 'edit',
  });

  const schedules = (dbCluster && dbCluster?.spec?.backup?.schedules) || [];
  const scheduleName = watch(ScheduleFormFields.scheduleName);

  useEffect(() => {
    if (mode === 'edit' && setSelectedScheduleName) {
      setSelectedScheduleName(scheduleName);
    }
  }, [scheduleName, mode, setSelectedScheduleName]);

  return (
    <ScheduleForm
      mode={mode}
      schedules={schedules}
      storageLocationFetching={isFetching}
      storageLocationOptions={backupStorages}
    />
  );
};
