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

import React, { useMemo, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useDbCluster } from '../../../../hooks/api/db-cluster/useDbCluster';
import { DbEngineType } from '../../../../types/dbEngines.types';
import { ScheduledBackupsList } from '../scheduled-backups-list/scheduled-backups-list';
import { BackupsList } from '../backups-list/backups-list';
import { ScheduledBackupModal } from '../scheduled-backup-modal/scheduled-backup-modal';
import { ScheduleModalContext } from '../scheduled-backup-modal/context/schedule-modal.context.tsx';

export const BackupsWrapper = () => {
  const { dbClusterName } = useParams();

  const { data: dbCluster } = useDbCluster(dbClusterName || '', {
    enabled: !!dbClusterName,
  });

  const { openScheduleModal } = useContext(ScheduleModalContext);

  const dbType = useMemo(
    () => dbCluster?.spec?.engine?.type,
    [dbCluster?.spec?.engine?.type]
  );

  return (
    <>
      {dbType !== DbEngineType.POSTGRESQL && <ScheduledBackupsList />}
      <BackupsList />
      {openScheduleModal && <ScheduledBackupModal />}
    </>
  );
};
