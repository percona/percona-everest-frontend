import { MenuItem } from '@mui/material';
import { RadioGroup, SelectInput } from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import { useDbBackups } from 'hooks/api/backups/useBackups';
import { FieldValues } from 'react-hook-form';
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
  console.log(backups);
  return (
    <FormDialog
      isOpen={isOpen}
      subHead2="Specify how you want to restore this database. Restoring will replace the current database instance with data from the selected snapshot."
      closeModal={closeModal}
      headerMessage={'Restore database'}
      schema={schema}
      onSubmit={(data: FieldValues) => {
        console.log(data);
      }}
      submitMessage={'Restore'}
    >
      <RadioGroup
        name={RestoreDbFields.backupType}
        options={[
          { label: 'From a backup', value: 'fromBackup' },
          { label: 'From a Point-in-time (PITR)', value: 'pitr' },
        ]}
      />
      <SelectInput
        name={RestoreDbFields.backupList}
        label={'Select backup'}
        selectFieldProps={{
          sx: { minWidth: '80px' },
        }}
      >
        {backups?.map((value) => (
          <MenuItem key={value.name} value={value.name}>
            {`${value.name} ${value.completed}`}
          </MenuItem>
        ))}
      </SelectInput>
    </FormDialog>
  );
};
