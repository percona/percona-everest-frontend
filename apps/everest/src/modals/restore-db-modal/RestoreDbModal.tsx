import { FormControl, InputLabel, MenuItem, Typography } from '@mui/material';
import {
  DateTimePickerInput,
  LoadableChildren,
  RadioGroup,
  SelectInput,
} from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import { useDbBackups, useDbClusterPitr } from 'hooks/api/backups/useBackups';
import { useDbClusterRestore } from 'hooks/api/restores/useDbClusterRestore';
import { FieldValues } from 'react-hook-form';
import { Messages } from './restoreDbModal.messages';
import {
  BackuptypeValues,
  RestoreDbFields,
  defaultValues,
  schema,
} from './restoreDbModal.schema';
import { FormDialogProps } from 'components/form-dialog/form-dialog.types';
import { BackupStatus } from 'shared-types/backups.types';
import { DbCluster } from 'shared-types/dbCluster.types';
import { DbEngineType } from '@percona/types';
import { DATE_FORMAT } from 'consts';

const RestoreDbModal = <T extends FieldValues>({
  closeModal,
  isOpen,
  dbCluster,
}: Pick<FormDialogProps<T>, 'closeModal' | 'isOpen'> & {
  dbCluster: DbCluster;
}) => {
  const { data: backups = [], isLoading } = useDbBackups(
    dbCluster.metadata.name
  );
  // Setting placeholderData allows us to avoid undefined checks along the code
  const { data: pitrData } = useDbClusterPitr(dbCluster.metadata.name, {
    placeholderData: {
      earliestDate: new Date().toISOString(),
      latestDate: new Date().toISOString(),
      latestBackupName: '',
    },
  });
  const { mutate: restoreBackup, isLoading: restoringBackup } =
    useDbClusterRestore(dbCluster.metadata.name);

  return (
    <FormDialog
      size="XXXL"
      isOpen={isOpen}
      closeModal={closeModal}
      headerMessage={Messages.headerMessage}
      schema={schema(pitrData!.earliestDate, pitrData!.latestDate)}
      submitting={restoringBackup}
      defaultValues={defaultValues}
      values={{ ...defaultValues, pitrBackup: pitrData!.latestDate }}
      onSubmit={({ backupName, backupType, pitrBackup }) => {
        console.log(backupType, backupName, pitrBackup);
        // restoreBackup(
        //   { backupName },
        //   {
        //     onSuccess() {
        //       closeModal();
        //     },
        //   }
        // );
      }}
      submitMessage={Messages.restore}
    >
      {({ watch }) => (
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
              {
                label: Messages.fromBackup,
                value: BackuptypeValues.fromBackup,
              },
              {
                label: Messages.fromPitr,
                value: BackuptypeValues.fromPitr,
                disabled: dbCluster.spec.engine.type !== DbEngineType.PXC,
              },
            ]}
          />
          {watch(RestoreDbFields.backupType) === BackuptypeValues.fromBackup ? (
            <FormControl>
              <InputLabel id="restore-backup">
                {Messages.selectBackup}
              </InputLabel>
              <SelectInput
                name={RestoreDbFields.backupName}
                selectFieldProps={{
                  labelId: 'restore-backup',
                  label: Messages.selectBackup,
                }}
              >
                {backups
                  .filter((value) => value.state === BackupStatus.OK)
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
          ) : (
            <DateTimePickerInput
              disableFuture
              minDate={new Date(pitrData!.earliestDate)}
              maxDate={new Date(pitrData!.latestDate)}
              format={DATE_FORMAT}
              name={RestoreDbFields.pitrBackup}
            />
          )}
        </LoadableChildren>
      )}
    </FormDialog>
  );
};

export default RestoreDbModal;
