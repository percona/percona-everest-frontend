import { TextInput, AutoCompleteInput } from '@percona/ui-lib';
import { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { FormDialog } from 'components/form-dialog';
import { useBackupStorages } from 'hooks/api/backup-storages/useBackupStorages';
import {
  BACKUPS_QUERY_KEY,
  useCreateBackupOnDemand,
} from 'hooks/api/backups/useBackups';
import { Messages } from '../../db-cluster-details.messages';
import { NoStoragesModal } from '../no-storages-modal/no-storages-modal';
import {
  BackupFields,
  BackupFormData,
  defaultValuesFc,
  OnDemandBackupModalProps,
  schema,
} from './on-demand-backup-modal.types';

export const OnDemandBackupModal = ({
  open,
  handleClose,
}: OnDemandBackupModalProps) => {
  const queryClient = useQueryClient();
  const { dbClusterName } = useParams();
  const { mutate: createBackupOnDemand, isLoading: creatingBackup } =
    useCreateBackupOnDemand(dbClusterName!);
  const { data: backupStorages = [], isFetching } = useBackupStorages();
  const handleSubmit = (data: BackupFormData) => {
    createBackupOnDemand(data, {
      onSuccess() {
        queryClient.invalidateQueries([BACKUPS_QUERY_KEY, dbClusterName]);
        handleClose();
      },
    });
  };

  const values = useMemo(() => defaultValuesFc(), []);

  if (!backupStorages.length) {
    return (
      <NoStoragesModal
        isOpen={open}
        subHead={Messages.onDemandBackupModal.subHead}
        closeModal={handleClose}
      />
    );
  }

  return (
    <FormDialog
      isOpen={open}
      closeModal={handleClose}
      headerMessage={Messages.onDemandBackupModal.headerMessage}
      onSubmit={handleSubmit}
      submitting={creatingBackup}
      submitMessage={Messages.onDemandBackupModal.submitMessage}
      schema={schema}
      values={values}
      size="XL"
      subHead2={Messages.onDemandBackupModal.subHead}
    >
      <TextInput
        name={BackupFields.name}
        label={Messages.onDemandBackupModal.backupName}
        isRequired
      />
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
