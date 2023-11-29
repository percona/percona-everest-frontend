import { MenuItem } from '@mui/material';
import { LoadableChildren, RadioGroup, SelectInput } from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import { useDbBackups } from 'hooks/api/backups/useBackups';
import { useDbClusterRestore } from 'hooks/api/restores/useDbClusterRestore';
import { FieldValues } from 'react-hook-form';
import { useBackupsStore } from 'stores/useBackupsStore';
import { Messages } from './restoreDbModal.messages';
import {
  BackuptypeValues,
  RestoreDbFields,
  defaultValues,
  schema,
} from './restoreDbModal.schema';

export const RestoreDbModal = () => {
  const { isOpenRestoreDbModal, dbClusterName, closeRestoreDbModal } =
    useBackupsStore();
  const { data: backups, isLoading } = useDbBackups(dbClusterName);
  const { mutate: restoreBackup, isLoading: restoringBackup } =
    useDbClusterRestore(dbClusterName!);
  return (
    <FormDialog
      isOpen={isOpenRestoreDbModal}
      subHead2={Messages.subHead}
      closeModal={closeRestoreDbModal}
      headerMessage={Messages.headerMessage}
      schema={schema}
      submitting={restoringBackup}
      defaultValues={defaultValues}
      onSubmit={(data: FieldValues) => {
        const backupName = data.backupList;
        restoreBackup(
          { backupName },
          {
            onSuccess() {
              closeRestoreDbModal();
            },
          }
        );
      }}
      submitMessage={Messages.restore}
    >
      <LoadableChildren loading={isLoading}>
        <RadioGroup
          name={RestoreDbFields.backupType}
          radioGroupFieldProps={{
            sx: {
              '& label': {
                display: 'flex',
                alignItems: 'center',
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
        <SelectInput
          name={RestoreDbFields.backupList}
          label={Messages.selectBackup}
          selectFieldProps={{
            displayEmpty: true,
            renderValue(value) {
              const stringValue = value as string;
              if (value === '') {
                return <span>{Messages.emptyValue}</span>;
              }
              return <span>{stringValue}</span>;
            },
            sx: { minWidth: '80px' },
          }}
        >
          {backups
            ?.filter((value) => value.completed)
            .map((value) => (
              <MenuItem key={value.name} value={value.name}>
                {`${value.name} - ${value.completed?.toLocaleString('en-US')}`}
              </MenuItem>
            ))}
        </SelectInput>
      </LoadableChildren>
    </FormDialog>
  );
};
