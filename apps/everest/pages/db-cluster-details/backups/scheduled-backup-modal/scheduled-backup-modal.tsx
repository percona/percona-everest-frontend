import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import { LabeledContent } from '@percona/ui-lib.labeled-content';
import React, { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { FormDialog } from '../../../../components/form-dialog';
import { TimeSelection } from '../../../../components/time-selection/time-selection';
import { useBackupStorages } from '../../../../hooks/api/backup-storages/useBackupStorages';
import { useCreateScheduledBackup } from '../../../../hooks/api/backups/useScheduledBackups';
import { DB_CLUSTER_QUERY } from '../../../../hooks/api/db-cluster/useDbCluster';
import { Messages } from '../../db-cluster-details.messages';
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
  const { mutate: createScheduledBackup, isLoading } = useCreateScheduledBackup(
    dbClusterName!
  );
  const { data: backupStorages = [], isFetching } = useBackupStorages();

  const handleSubmit = (data: ScheduledBackupFormData) => {
    createScheduledBackup(data, {
      onSuccess() {
        queryClient.invalidateQueries([DB_CLUSTER_QUERY, dbClusterName]);
        handleClose();
      },
    });
  };

  const values = useMemo(() => defaultValuesFc(), [open]);

  return (
    <FormDialog
      isOpen={open}
      closeModal={handleClose}
      headerMessage={Messages.onDemandBackupModal.headerMessage}
      onSubmit={handleSubmit}
      submitting={isLoading}
      submitMessage={Messages.onDemandBackupModal.submitMessage}
      schema={schema}
      values={values}
      size="XXL"
      subHead2={Messages.onDemandBackupModal.subHead}
    >
      <TextInput
        name={BackupFields.name}
        label={Messages.onDemandBackupModal.backupName}
        isRequired
      />
      <LabeledContent label="Repeats">
        <TimeSelection showInfoAlert />
      </LabeledContent>

      <AutoCompleteInput
        name={BackupFields.storageLocation}
        label={Messages.onDemandBackupModal.backupStorage}
        loading={isFetching}
        options={backupStorages}
        autoCompleteProps={{
          isOptionEqualToValue: (option, value) => option.name === value.name,
          getOptionLabel: (option) =>
            typeof option === 'string' ? option : option.name,
        }}
        isRequired
      />
    </FormDialog>
  );
};
