import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from '@mui/material';
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
import { FormDialogProps } from 'components/form-dialog/form-dialog.types';
// import { useNavigate } from 'react-router-dom';
import { BackupStatus } from 'shared-types/backups.types';
import {
  BackuptypeValues,
  RestoreDbFields,
  defaultValues,
  schema,
} from './restore-db-modal-schema';
import { DbCluster } from 'shared-types/dbCluster.types';
import { DbEngineType } from '@percona/types';
import { DATE_FORMAT } from 'consts';
import { Messages } from './restore-db-modal.messages';
import { format } from 'date-fns';

const RestoreDbModal = <T extends FieldValues>({
  closeModal,
  isOpen,
  dbCluster,
  isNewClusterMode,
}: Pick<FormDialogProps<T>, 'closeModal' | 'isOpen'> & {
  dbCluster: DbCluster;
  isNewClusterMode: boolean;
}) => {
  // const navigate = useNavigate();
  const { data: backups = [], isLoading } = useDbBackups(
    dbCluster.metadata.name
  );
  // Setting placeholderData allows us to avoid undefined checks along the code
  const { data: pitrData } = useDbClusterPitr(dbCluster.metadata.name, {
    placeholderData: {
      earliestDate: new Date().toISOString(),
      latestDate: new Date().toISOString(),
      latestBackupName: '',
      gaps: false,
    },
  });

  const { /*mutate: restoreBackup,*/ isLoading: restoringBackup } =
    useDbClusterRestore(dbCluster.metadata.name);

  return (
    <FormDialog
      size="XXXL"
      isOpen={isOpen}
      dataTestId="restore-modal"
      closeModal={closeModal}
      headerMessage={
        isNewClusterMode ? Messages.headerMessageCreate : Messages.headerMessage
      }
      schema={schema(
        pitrData!.earliestDate,
        pitrData!.latestDate,
        !!pitrData?.gaps
      )}
      submitting={restoringBackup}
      defaultValues={defaultValues}
      values={{ ...defaultValues, pitrBackup: pitrData!.latestDate }}
      onSubmit={({ backupName, backupType, pitrBackup }) => {
        console.log(backupType, backupName, pitrBackup);
        // if (isNewClusterMode) {
        //   closeModal();
        //   const selectedBackup = backups?.find(
        //     (backup) => backup.name === backupName
        //   );
        //   navigate('/databases/new', {
        //     state: {
        //       selectedDbCluster: dbClusterName!,
        //       backupName: backupName,
        //       backupStorageName: selectedBackup,
        //     },
        //   });
        // } else {
        //   restoreBackup(
        //     { backupName },
        //     {
        //       onSuccess() {
        //         closeModal();
        //       },
        //     }
        //   );
        // }
      }}
      submitMessage={isNewClusterMode ? Messages.create : Messages.restore}
    >
      {({ watch }) => (
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
            <FormControl sx={{ mt: 1.5 }}>
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
            <>
              <Alert
                sx={{ mt: 1.5 }}
                severity={pitrData?.gaps ? 'error' : 'info'}
              >
                {pitrData?.gaps
                  ? Messages.gapDisclaimer
                  : Messages.pitrDisclaimer(
                      format(pitrData!.earliestDate, DATE_FORMAT),
                      format(pitrData!.latestDate, DATE_FORMAT)
                    )}
              </Alert>
              {!pitrData?.gaps && (
                <DateTimePickerInput
                  disableFuture
                  minDate={new Date(pitrData!.earliestDate)}
                  maxDate={new Date(pitrData!.latestDate)}
                  format={DATE_FORMAT}
                  name={RestoreDbFields.pitrBackup}
                  sx={{ mt: 3 }}
                />
              )}
            </>
          )}
        </LoadableChildren>
      )}
    </FormDialog>
  );
};

export default RestoreDbModal;
