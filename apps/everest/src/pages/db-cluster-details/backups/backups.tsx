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

import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { Alert, Box, Button, Typography } from '@mui/material';
import {
  BACKUP_STORAGES_QUERY_KEY,
  useBackupStorages,
  useCreateBackupStorage,
} from 'hooks/api/backup-storages/useBackupStorages.ts';
import { useDbCluster } from 'hooks/api/db-cluster/useDbCluster';
import { useDbClusters } from 'hooks/api/db-clusters/useDbClusters';
import { CreateEditModalStorage } from 'pages/settings/storage-locations/createEditModal/create-edit-modal.tsx';
import { useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { BackupStorage } from 'shared-types/backupStorages.types.ts';
import { DbEngineType } from 'shared-types/dbEngines.types';
import { updateDataAfterCreate } from 'utils/generalOptimisticDataUpdate.ts';
import { BackupsList } from './backups-list/backups-list';
import { ScheduleModalContext } from './backups.context.ts';
import { Messages } from './backups.messages.ts';
import { ScheduledBackupModal } from './scheduled-backup-modal/scheduled-backup-modal';
import { ScheduledBackupsList } from './scheduled-backups-list/scheduled-backups-list';

export const Backups = () => {
  const { dbClusterName } = useParams();
  const queryClient = useQueryClient();
  const { data = [] } = useDbClusters();
  const [openCreateEditModal, setOpenCreateEditModal] = useState(false);
  const { mutate: createBackupStorage, isLoading: creatingBackupStorage } =
    useCreateBackupStorage();
  const { data: backupStorages = [] } = useBackupStorages();
  const dbNameExists = data.find(
    (cluster) => cluster.metadata.name === dbClusterName
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

  const handleSubmit = (_: boolean, data: BackupStorage) => {
    handleCreateBackup(data);
  };

  const handleCreateBackup = (data: BackupStorage) => {
    createBackupStorage(data, {
      onSuccess: (newLocation) => {
        updateDataAfterCreate(
          queryClient,
          BACKUP_STORAGES_QUERY_KEY
        )(newLocation);
        handleCloseModal();
      },
    });
  };

  const handleCloseModal = () => {
    setOpenCreateEditModal(false);
  };

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
      {backupStorages.length === 0 ? (
        <Box
          sx={{
            display: 'flex',
            py: 6,
            px: 0,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1,
            alignSelf: 'stretch',
          }}
        >
          <Box sx={{ fontSize: '100px', lineHeight: 0 }}>
            <WarningAmberIcon fontSize="inherit" />
          </Box>
          <Typography variant="body1">{Messages.noStoragesMessage}</Typography>
          <Button
            sx={{ my: 4 }}
            variant="contained"
            onClick={() => setOpenCreateEditModal(true)}
          >
            {Messages.addStorage}
          </Button>
        </Box>
      ) : (
        dbNameExists && (
          <>
            {!dbCluster?.spec?.backup?.enabled && (
              <Alert severity="info">
                {dbType === DbEngineType.POSTGRESQL
                  ? Messages.backupsDisabledPG
                  : Messages.backupsDisabled}
              </Alert>
            )}
            {dbType !== DbEngineType.POSTGRESQL && <ScheduledBackupsList />}
            <BackupsList />
            {openScheduleModal && <ScheduledBackupModal />}
          </>
        )
      )}
      {openCreateEditModal && (
        <CreateEditModalStorage
          open={openCreateEditModal}
          handleCloseModal={handleCloseModal}
          handleSubmitModal={handleSubmit}
          isLoading={creatingBackupStorage}
        />
      )}
    </ScheduleModalContext.Provider>
  );
};
