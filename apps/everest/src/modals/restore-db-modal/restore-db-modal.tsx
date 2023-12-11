import { FormControl, InputLabel, MenuItem, Typography } from '@mui/material';
import { LoadableChildren, RadioGroup, SelectInput } from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import { FormDialogProps } from 'components/form-dialog/form-dialog.types';
import { useDbBackups } from 'hooks/api/backups/useBackups';
import { useDbClusterRestore } from 'hooks/api/restores/useDbClusterRestore';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BackupStatus } from 'shared-types/backups.types';
import {
  BackuptypeValues,
  RestoreDbFields,
  defaultValues,
  schema,
} from './restore-db-modal-schema';
import { Messages } from './restore-db-modal.messages';

const RestoreDbModal = <T extends FieldValues>({
  closeModal,
  isOpen,
  isNewClusterMode,
  dbClusterName,
}: Pick<FormDialogProps<T>, 'closeModal' | 'isOpen'> & {
  isNewClusterMode: boolean;
  dbClusterName: string;
}) => {
  const navigate = useNavigate();
  const { data: backups, isLoading } = useDbBackups(dbClusterName);
  const { mutate: restoreBackup, isLoading: restoringBackup } =
    useDbClusterRestore(dbClusterName!);

  return (
    <FormDialog
      size="XXXL"
      isOpen={isOpen}
      dataTestId="restore"
      closeModal={closeModal}
      headerMessage={
        isNewClusterMode ? Messages.headerMessageCreate : Messages.headerMessage
      }
      schema={schema}
      submitting={restoringBackup}
      defaultValues={defaultValues}
      onSubmit={({ backupName }) => {
        const backupNameWithoutTime = backupName.split(' - ')[0];

        if (isNewClusterMode) {
          closeModal();
          const selectedBackup = backups?.find(
            (backup) => backup.name === backupNameWithoutTime
          );
          navigate('/databases/new', {
            state: {
              selectedDbCluster: dbClusterName!,
              backupName: backupNameWithoutTime,
              backupStorageName: selectedBackup,
            },
          });
        } else {
          restoreBackup(
            { backupName: backupNameWithoutTime },
            {
              onSuccess() {
                closeModal();
              },
            }
          );
        }
      }}
      submitMessage={isNewClusterMode ? Messages.create : Messages.restore}
    >
      <LoadableChildren loading={isLoading}>
        <Typography variant="body1">
          {isNewClusterMode ? Messages.subHeadCreate : Messages.subHead}
        </Typography>
        <RadioGroup
          name={RestoreDbFields.backupType}
          radioGroupFieldProps={{
            sx: {
              ml: 1,
              display: 'flex',
              gap: 3,
              '& label': {
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                padding: 1,
                '& span': {
                  padding: '0px !important',
                },
              },
            },
          }}
          options={[
            { label: Messages.fromBackup, value: BackuptypeValues.fromBackup },
            {
              label: Messages.fromPitr,
              value: BackuptypeValues.fromPitr,
              disabled: true,
            },
          ]}
        />
        <FormControl sx={{ mt: 3 }}>
          <InputLabel shrink id="restore-backup">
            {Messages.selectBackup}
          </InputLabel>
          <SelectInput
            name={RestoreDbFields.backupName}
            selectFieldProps={{
              labelId: 'restore-backup',
              notched: true,
              label: Messages.selectBackup,
              displayEmpty: true,
              renderValue: (value) => {
                const stringValue = value as string;
                if (value === '') {
                  return <span>{Messages.emptyValue}</span>;
                }
                return <span>{stringValue}</span>;
              },
            }}
          >
            {backups
              ?.filter((value) => value.state === BackupStatus.OK)
              .map((value) => {
                const valueWithTime = `${
                  value.name
                } - ${value.created?.toLocaleString('en-US')}`;
                return (
                  <MenuItem key={value.name} value={valueWithTime}>
                    {valueWithTime}
                  </MenuItem>
                );
              })}
          </SelectInput>
        </FormControl>
      </LoadableChildren>
    </FormDialog>
  );
};

export default RestoreDbModal;
