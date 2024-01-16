import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Typography,
} from '@mui/material';
import { DbEngineType } from '@percona/types';
import {
  DateTimePickerInput,
  LoadableChildren,
  RadioGroup,
  SelectInput,
} from '@percona/ui-lib';
import { FormDialog } from 'components/form-dialog';
import { FormDialogProps } from 'components/form-dialog/form-dialog.types';
import { PITR_DATE_FORMAT } from 'consts';
import { format } from 'date-fns';
import { useDbBackups, useDbClusterPitr } from 'hooks/api/backups/useBackups';
import {
  useDbClusterRestoreFromBackup,
  useDbClusterRestoreFromPointInTime,
} from 'hooks/api/restores/useDbClusterRestore';
import { FieldValues } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { BackupStatus } from 'shared-types/backups.types';
import { DbCluster } from 'shared-types/dbCluster.types';
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
  dbCluster,
  isNewClusterMode,
}: Pick<FormDialogProps<T>, 'closeModal' | 'isOpen'> & {
  dbCluster: DbCluster;
  isNewClusterMode: boolean;
}) => {
  const navigate = useNavigate();
  const { data: backups = [], isLoading } = useDbBackups(
    dbCluster.metadata.name
  );
  const { data: pitrData } = useDbClusterPitr(dbCluster.metadata.name);

  const { mutate: restoreBackupFromBackup, isLoading: restoringFromBackup } =
    useDbClusterRestoreFromBackup(dbCluster.metadata.name);
  const {
    mutate: restoreBackupFromPointInTime,
    isLoading: restoringFromPointInTime,
  } = useDbClusterRestoreFromPointInTime(dbCluster.metadata.name);

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
        pitrData?.earliestDate || new Date(),
        pitrData?.latestDate || new Date(),
        !!pitrData?.gaps
      )}
      submitting={restoringFromBackup || restoringFromPointInTime}
      defaultValues={defaultValues}
      values={{ ...defaultValues, pitrBackup: pitrData?.latestDate }}
      onSubmit={({ backupName, backupType, pitrBackup }) => {
        if (isNewClusterMode) {
          closeModal();
          const selectedBackup = backups?.find(
            (backup) => backup.name === backupName
          );
          navigate('/databases/new', {
            state: {
              selectedDbCluster: dbCluster.metadata.name,
              backupName,
              backupStorageName: selectedBackup,
            },
          });
        } else {
          if (backupType === BackuptypeValues.fromBackup) {
            restoreBackupFromBackup(
              { backupName },
              {
                onSuccess() {
                  closeModal();
                  navigate('/');
                },
              }
            );
          } else {
            restoreBackupFromPointInTime(
              {
                backupName: pitrData!.latestBackupName,
                pointInTimeDate: pitrBackup!.toISOString().split('.')[0] + 'Z',
              },
              {
                onSuccess() {
                  closeModal();
                  navigate('/');
                },
              }
            );
          }
        }
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
                disabled:
                  dbCluster.spec.engine.type === DbEngineType.POSTGRESQL ||
                  isNewClusterMode,
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
                  .sort((a, b) => {
                    if (a.created && b.created) {
                      return b.created.valueOf() - a.created.valueOf();
                    }
                    return -1;
                  })
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
              {pitrData && (
                <Alert
                  sx={{ mt: 1.5, mb: 1.5 }}
                  severity={pitrData?.gaps ? 'error' : 'info'}
                >
                  {pitrData?.gaps
                    ? Messages.gapDisclaimer
                    : Messages.pitrDisclaimer(
                        format(
                          pitrData?.earliestDate || new Date(),
                          PITR_DATE_FORMAT
                        ),
                        format(
                          pitrData?.latestDate || new Date(),
                          PITR_DATE_FORMAT
                        )
                      )}
                </Alert>
              )}
              {!pitrData?.gaps && (
                <DateTimePickerInput
                  views={[
                    'year',
                    'month',
                    'day',
                    'hours',
                    'minutes',
                    'seconds',
                  ]}
                  timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
                  disableFuture
                  disabled={!pitrData}
                  minDate={new Date(pitrData?.earliestDate || new Date())}
                  maxDate={new Date(pitrData?.latestDate || new Date())}
                  format={PITR_DATE_FORMAT}
                  name={RestoreDbFields.pitrBackup}
                  label={pitrData ? 'Select point in time' : 'No options'}
                  sx={{ mt: 1.5 }}
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
