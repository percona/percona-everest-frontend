import { MenuItem } from '@mui/material';
import { LoadableChildren, RadioGroup, SelectInput } from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import { useDbBackups } from 'hooks/api/backups/useBackups';
import { useDbClusterRestore } from 'hooks/api/restores/useDbClusterRestore';
import { FieldValues } from 'react-hook-form';
import { Messages } from './restoreDbModal.messages';
import { RestoreDbFields, schema } from './restoreDbModal.schema';
type RestoreDbModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  dbClusterName: string;
};

export const RestoreDbModal = ({
  isOpen,
  closeModal,
  dbClusterName,
}: RestoreDbModalProps) => {
  const { data: backups, isLoading } = useDbBackups(dbClusterName);
  const { mutate: restoreBackup, isLoading: restoringBackup } =
    useDbClusterRestore(dbClusterName!);
  return (
    <FormDialog
      isOpen={isOpen}
      subHead2={Messages.subHead}
      closeModal={closeModal}
      headerMessage={Messages.headerMessage}
      schema={schema}
      submitting={restoringBackup}
      onSubmit={(data: FieldValues) => {
        const backupName = data.backupList;
        restoreBackup(
          { backupName },
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
            { label: Messages.fromBackup, value: 'fromBackup' },
            {
              label: Messages.fromPitr,
              value: 'pitr',
              disabled: true,
            },
          ]}
        />
        <SelectInput
          name={RestoreDbFields.backupList}
          label={Messages.selectBackup}
          selectFieldProps={{
            sx: { minWidth: '80px' },
          }}
        >
          {backups
            ?.filter((value) => value.completed)
            .map((value) => (
              <MenuItem key={value.name} value={value.name}>
                {`${value.name} ${value.completed}`}
              </MenuItem>
            ))}
        </SelectInput>
      </LoadableChildren>
    </FormDialog>
  );
};
