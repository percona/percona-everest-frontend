import { FormControl, InputLabel, MenuItem, Typography } from '@mui/material';
import { LoadableChildren, RadioGroup, SelectInput } from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import { useDbBackups } from 'hooks/api/backups/useBackups';
import { useDbClusterRestore } from 'hooks/api/restores/useDbClusterRestore';
import { FieldValues } from 'react-hook-form';
import { useMainStore } from 'stores/useMainStore';
import { useShallow } from 'zustand/react/shallow';
import { Messages } from './restoreDbModal.messages';
import {
  BackuptypeValues,
  RestoreDbFields,
  defaultValues,
  schema,
} from './restoreDbModal.schema';
import { FormDialogProps } from 'components/form-dialog/form-dialog.types';
import { BackupStatus } from 'shared-types/backups.types';

const RestoreDbModal = <T extends FieldValues>({
  closeModal,
  isOpen,
}: Pick<FormDialogProps<T>, 'closeModal' | 'isOpen'>) => {
  const [dbClusterName] = useMainStore(
    useShallow((state) => [state.dbClusterName])
  );
  const { data: backups, isLoading } = useDbBackups(dbClusterName);
  const { mutate: restoreBackup, isLoading: restoringBackup } =
    useDbClusterRestore(dbClusterName!);
  return (
    <FormDialog
      size="XXXL"
      isOpen={isOpen}
      closeModal={closeModal}
      headerMessage={Messages.headerMessage}
      schema={schema}
      submitting={restoringBackup}
      defaultValues={defaultValues}
      onSubmit={(data: FieldValues) => {
        const backupNameStripped = data.backupList.split(' - ')[0];
        restoreBackup(
          { backupName: backupNameStripped },
          {
            onSuccess() {
              closeModal();
            },
          }
        );
      }}
      submitMessage={Messages.restore}
    >
      <LoadableChildren loading={isLoading}>
        <Typography variant="body1">{Messages.subHead}</Typography>
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
        <FormControl>
          <InputLabel id="restore-backup">{Messages.selectBackup}</InputLabel>
          <SelectInput
            name={RestoreDbFields.backupList}
            selectFieldProps={{
              // displayEmpty: true,
              // renderValue: (value) => {
              //   const stringValue = value as string;
              //   if (value === '') {
              //     return <span>{Messages.emptyValue}</span>;
              //   }
              //   return <span>{stringValue}</span>;
              // },
              labelId: 'restore-backup',
              label: Messages.selectBackup,
            }}
          >
            {backups
              ?.filter((value) => value.state === BackupStatus.OK)
              .map((value) => {
                const valueWithTime = `${
                  value.name
                } - ${value.created?.toLocaleString('en-US')}`;
                return (
                  <MenuItem key={value.name} value={value.name}>
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
