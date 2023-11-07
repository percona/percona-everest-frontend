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

import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDbCluster } from 'hooks/api/db-cluster/useDbCluster';
import { useDbClusters } from 'hooks/api/db-clusters/useDbClusters';
import { DbEngineType } from 'shared-types/dbEngines.types';
import { ScheduleModalContext } from './backup.context';
import { BackupsList } from './backups-list/backups-list';
import { ScheduledBackupModal } from './scheduled-backup-modal/scheduled-backup-modal';
import { ScheduledBackupsList } from './scheduled-backups-list/scheduled-backups-list';

export const Backups = () => {
  const { dbClusterName } = useParams();
  const { combinedDataForTable } = useDbClusters();
  const dbNameExists = combinedDataForTable.find(
    (cluster) => cluster.databaseName === dbClusterName
  );
  const { data: dbCluster } = useDbCluster(dbClusterName || '', {
    enabled: !!dbClusterName && !!dbNameExists,
  });

  const [mode, setMode] = useState<'new' | 'edit'>('new');
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [selectedScheduleName, setSelectedScheduleName] = useState<string>('');

  const dbType = useMemo(
    () => dbCluster?.spec?.engine?.type,
    [dbCluster?.spec?.engine?.type]
  );

  return (
    <ScheduleModalContext.Provider
      value={{
        mode,
        setMode,
        openScheduleModal,
        setOpenScheduleModal,
        selectedScheduleName,
        setSelectedScheduleName,
      }}
    >
      {dbNameExists && (
        <>
          {dbType !== DbEngineType.POSTGRESQL && <ScheduledBackupsList />}
          <BackupsList />
          {openScheduleModal && <ScheduledBackupModal />}
        </>
      )}
    </ScheduleModalContext.Provider>
  );
};
