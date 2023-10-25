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
import { useParams } from 'react-router-dom';
import { useBackupStorages } from '../../../../../hooks/api/backup-storages/useBackupStorages';
import { useDbCluster } from '../../../../../hooks/api/db-cluster/useDbCluster';
import { ScheduleModalContext } from '../../backup.context';
import {ScheduleForm} from "../../../../../components/schedule-form/schedule-form";

export const ScheduledBackupModalForm = () => {
  // const { watch, setError, setValue, clearErrors, formState } = useFormContext();
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

  // const scheduleName = watch(ScheduleFields.name);
  //   useEffect(() => {
  //       if (mode==='new') {
  //                 if (checkUniquenessOfScheduleName(dbCluster?.spec?.backup?.schedules||[], scheduleName)) {
  //                     console.log('true');
  //                     setError(ScheduleFields.name, {type: 'custom', message:'text'});
  //                 } else {
  //                     console.log('false');
  //                 }
  //             }
  //   }, [scheduleName,dbCluster]);

  console.log('render');
  // useEffect(()=> {
  //   console.log('mode', mode);
  // },[mode]);
  // useEffect(()=>{
  //   console.log('schedules', )
  // },[schedules])


  return (
      <ScheduleForm mode={mode} schedules={schedules} storageLocationFetching={isFetching} storageLocationOptions={backupStorages}/>
  );
};
