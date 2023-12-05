import { MenuItem, Typography } from '@mui/material';
import { LoadableChildren, RadioGroup, SelectInput } from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import { useDbBackups } from 'hooks/api/backups/useBackups';
import { useDbClusterRestore } from 'hooks/api/restores/useDbClusterRestore';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useMainStore } from 'stores/useMainStore';
import { useShallow } from 'zustand/react/shallow';
import { Messages } from './restoreDbModal.messages';
import {
  BackuptypeValues,
  RestoreDbFields,
  defaultValues,
  schema,
} from './restoreDbModal.schema';

export const RestoreDbModal = () => {
  const navigate = useNavigate();
  const [isOpenRestoreDbModal, dbClusterName, mode] = useMainStore(
    useShallow((state) => [
      state.isOpenRestoreDbModal,
      state.dbClusterName,
      state.mode,
    ])
  );
  const { closeRestoreDbModal } = useMainStore();
  const { data: backups, isLoading } = useDbBackups(dbClusterName);
  const { mutate: restoreBackup, isLoading: restoringBackup } =
    useDbClusterRestore(dbClusterName!);

  return (
    <>
      <FormDialog
        size="XXXL"
        isOpen={isOpenRestoreDbModal}
        closeModal={closeRestoreDbModal}
        headerMessage={Messages.headerMessage}
        schema={schema}
        submitting={restoringBackup}
        defaultValues={defaultValues}
        onSubmit={(data: FieldValues) => {
          const backupNameStripped = data.backupList.split(' - ')[0];
          if (mode === 'sameCluster') {
            restoreBackup(
              { backupName: backupNameStripped },
              {
                onSuccess() {
                  closeRestoreDbModal();
                },
              }
            );
          } else {
            closeRestoreDbModal();
            const selectedBackup = backups?.find(
              (backup) => backup.name === backupNameStripped
            );
            navigate('/databases/new', {
              state: {
                selectedDbCluster: dbClusterName!,
                backupName: backupNameStripped,
                backupStorageName: selectedBackup,
              },
            });
          }
        }}
        submitMessage={mode === 'newCluster' ? 'Create' : Messages.restore}
      >
        <LoadableChildren loading={isLoading}>
          <Typography variant="body1">{Messages.subHead}</Typography>
          <RadioGroup
            name={RestoreDbFields.backupType}
            radioGroupFieldProps={{
              sx: {
                ml: '9px',
                display: 'flex',
                gap: '24px',
                '& label': {
                  display: 'flex',
                  gap: '10px',
                  alignItems: 'center',
                  padding: '9px',
                  '& span': {
                    padding: '0px !important',
                  },
                },
              },
            }}
            options={[
              {
                label: Messages.fromBackup,
                value: BackuptypeValues.fromBackup,
              },
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
              renderValue: (value) => {
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
              .map((value) => {
                const valueWithTime = `${
                  value.name
                } - ${value.completed?.toLocaleString('en-US')}`;
                return (
                  <MenuItem key={value.name} value={valueWithTime}>
                    {valueWithTime}
                  </MenuItem>
                );
              })}
          </SelectInput>
        </LoadableChildren>
      </FormDialog>
    </>
  );
};
