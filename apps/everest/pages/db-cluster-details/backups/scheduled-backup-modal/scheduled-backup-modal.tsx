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

import React, { useContext, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { FormDialog } from '../../../../components/form-dialog';
import { useBackupStorages } from '../../../../hooks/api/backup-storages/useBackupStorages';
import { Messages as CommonMessages } from '../../db-cluster-details.messages';
import { NoStoragesModal } from '../no-storages-modal/no-storages-modal';
import {
  BackupFields,
  defaultValuesFc,
  OnDemandBackupModalProps,
  ScheduledBackupFormData,
  schema,
} from './scheduled-backup-modal.types';

export const ScheduledBackupModal = ({
  open,
  handleClose,
}: OnDemandBackupModalProps) => {
  const queryClient = useQueryClient();
  const { dbClusterName } = useParams();
  const {
    mode,
    selectedScheduleName,
    openScheduleModal,
    setOpenScheduleModal,
  } = useContext(ScheduleModalContext);

  const { data: backupStorages = [] } = useBackupStorages();

  const { data: dbCluster } = useDbCluster(dbClusterName!, {
    enabled: !!dbClusterName && mode === 'edit',
  });
  const { mutate: updateScheduledBackup, isLoading } = useUpdateSchedules(
    dbClusterName!,
    mode
  );

  const schedules = (dbCluster && dbCluster?.spec?.backup?.schedules) || [];
  const schedulesNamesList =
    (schedules && schedules.map((item) => item?.name)) || [];
  const sheduledBackupSchema = useMemo(
    () => schema(schedulesNamesList, mode),
    [schedulesNamesList, mode]
  );
  const { data: backupStorages = [], isFetching } = useBackupStorages();

  const selectedSchedule = useMemo(
    () =>
      mode === 'edit' &&
      schedules &&
      schedules.find((item) => item?.name === selectedScheduleName),
    [mode, openScheduleModal, schedules, selectedScheduleName]
  );

  const handleCloseScheduledBackupModal = () => {
    if (setOpenScheduleModal) {
      setOpenScheduleModal(false);
    }
  };

  const handleSubmit = (data: ScheduleFormData) => {
    updateScheduledBackup(data, {
      onSuccess() {
        queryClient.invalidateQueries([DB_CLUSTER_QUERY, dbClusterName]);
        handleCloseScheduledBackupModal();
      },
    });
  };

  const values = useMemo(
    () => scheduleModalDefaultValues(mode, selectedSchedule),
    [mode, selectedSchedule, openScheduleModal]
  );

  if (!backupStorages.length) {
    return (
      <NoStoragesModal
        isOpen={openScheduleModal}
        subHead={CommonMessages.schedulesBackupModal.subHead}
        closeModal={handleCloseScheduledBackupModal}
      />
    );
  }

  return (
    <FormDialog
      isOpen={openScheduleModal}
      closeModal={handleCloseScheduledBackupModal}
      headerMessage={
        mode === 'new'
          ? Messages.createSchedule.headerMessage
          : Messages.editSchedule.headerMessage
      }
      onSubmit={handleSubmit}
      submitting={isLoading}
      submitMessage={
        mode === 'new'
          ? Messages.createSchedule.submitMessage
          : Messages.editSchedule.submitMessage
      }
      schema={sheduledBackupSchema}
      {...(mode === 'edit' && { values })}
      defaultValues={values}
      {...(mode === 'new' && { subHead2: Messages.createSchedule.subhead })}
      size="XXL"
      data-testId="scheduled-backup-modal"
    >
      <ScheduledBackupModalForm />
    </FormDialog>
  );
};
