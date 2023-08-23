import { FormDialog } from '@percona/everest.form.form-dialog';
import { AutoCompleteInput } from '@percona/ui-lib.form.inputs.auto-complete';
import { TextInput } from '@percona/ui-lib.form.inputs.text';
import React from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';

import { useBackupStorages } from '../../../hooks/api/backup-storages/useBackupStorages';
import { useCreateBackupOnDemand } from '../../../hooks/api/backups/useBackups';
import {
  BackupFields,
  BackupFormData,
  defaultValues,
  OnDemandBackupModalProps,
  schema,
} from './on-demand-backup-modal.types';

export const OnDemandBackupModal = ({
  open,
  handleClose,
}: OnDemandBackupModalProps) => {
  const queryClient = useQueryClient();
  const { dbClusterName } = useParams();
  const { mutate: createBackupOnDemand } = useCreateBackupOnDemand(
    dbClusterName!
  );
  const { data: backupStorages = [], isFetching } = useBackupStorages();
  const handleSubmit = (data: BackupFormData) => {
    createBackupOnDemand(data, {
      onSuccess() {
        queryClient.invalidateQueries(`${dbClusterName}-backups`);
      },
    });
  };
  return (
    <FormDialog
      isOpen={open}
      closeModal={handleClose}
      headerMessage="Create backup"
      onSubmit={handleSubmit}
      submitMessage="Create"
      schema={schema}
      defaultValues={defaultValues}
    >
      <TextInput name={BackupFields.name} label="Backup Name" isRequired />
      <AutoCompleteInput
        name={BackupFields.storageLocation}
        label="Storage location"
        loading={isFetching}
        options={backupStorages}
        autoCompleteProps={{
          isOptionEqualToValue: (option, value) => option.name === value.name,
          getOptionLabel: (option) =>
            typeof option === 'string' ? option : option.name,
        }}
      />
    </FormDialog>
  );
};
