import { useFormContext } from 'react-hook-form';
import { ScheduleForm } from '../../../../../components/schedule-form/schedule-form.tsx';
import { useBackupStorages } from '../../../../../hooks/api/backup-storages/useBackupStorages.ts';
import { useEffect } from 'react';
import { DbWizardFormFields } from '../../../database-form.types.ts';
import { useDatabasePageMode } from '../../../useDatabasePageMode.ts';
import { generateShortUID } from '../../first/utils.ts';
import { useDatabasePageDefaultValues } from '../../../useDatabaseFormDefaultValues.ts';

export const ScheduleBackupSection = () => {
  const mode = useDatabasePageMode();
  const { setValue, getFieldState, watch } = useFormContext();
  const { data: backupStorages = [], isFetching } = useBackupStorages();
  const { dbClusterData } = useDatabasePageDefaultValues(mode);
  const storageLocationField = watch(DbWizardFormFields.storageLocation);

  useEffect(() => {
    if (mode === 'new' && backupStorages?.length > 0) {
      setValue(DbWizardFormFields.storageLocation, {
        name: backupStorages[0].name,
      });
    }
    if (
      (mode === 'edit' || mode === 'restoreFromBackup') &&
      backupStorages?.length > 0 &&
      !!storageLocationField
    ) {
      setValue(DbWizardFormFields.storageLocation, {
        name: backupStorages[0].name,
      });
    }
  }, [backupStorages, mode, setValue, storageLocationField]);

  const schedules =
    mode === 'new' ? [] : dbClusterData?.spec?.backup?.schedules || [];

  useEffect(() => {
    const { isTouched: nameTouched } = getFieldState(
      DbWizardFormFields.scheduleName
    );
    if (
      (!nameTouched && mode === 'new') ||
      (mode === 'edit' && schedules?.length === 0)
    ) {
      setValue(
        DbWizardFormFields.scheduleName,
        `backup-${generateShortUID()}`,
        {
          shouldValidate: true,
        }
      );
    }
  }, []);

  const scheduleFormMode =
    schedules?.length === 1 ? 'editDbWizard' : 'newDbWizard';

  return (
    <ScheduleForm
      mode={scheduleFormMode}
      schedules={schedules}
      storageLocationFetching={isFetching}
      storageLocationOptions={backupStorages}
    />
  );
};
