import { DbType } from '@percona/types';
import { AutoCompleteAutoFill } from 'components/auto-complete-auto-fill/auto-complete-auto-fill';
import { DbWizardFormFields } from 'pages/database-form/database-form.types';
import { Messages as StorageLocationMessages } from 'components/schedule-form/schedule-form.messages';
import { Typography } from '@mui/material';
import { Messages } from './pitr.messages';
import { useEffect, useMemo } from 'react';
import { useBackupStorages } from 'hooks/api/backup-storages/useBackupStorages';
import { useDatabasePageMode } from 'pages/database-form/useDatabasePageMode';
import { useFormContext } from 'react-hook-form';

const PitrStorage = () => {
  const mode = useDatabasePageMode();
  const { watch, setValue } = useFormContext();
  const { data: backupStorages = [], isFetching: loadingBackupStorages } =
    useBackupStorages();

  const [
    pitrEnabled,
    storageLocation,
    pitrStorageLocation,
    dbType,
    selectedNamespace,
  ] = watch([
    DbWizardFormFields.pitrEnabled,
    DbWizardFormFields.storageLocation,
    DbWizardFormFields.pitrStorageLocation,
    DbWizardFormFields.dbType,
    DbWizardFormFields.k8sNamespace,
  ]);
  const availableBackupStorages = useMemo(
    () =>
      backupStorages.filter((item) =>
        item.targetNamespaces.includes(selectedNamespace)
      ),
    [selectedNamespace, backupStorages]
  );

  const locationToUse = storageLocation || pitrStorageLocation;

  useEffect(() => {
    if (availableBackupStorages?.length > 0) {
      if (mode === 'new') {
        setValue(DbWizardFormFields.pitrStorageLocation, {
          name: availableBackupStorages[0].name,
        });
      }

      if (
        (mode === 'edit' || mode === 'restoreFromBackup') &&
        !pitrStorageLocation
      ) {
        setValue(DbWizardFormFields.pitrStorageLocation, {
          name: availableBackupStorages[0].name,
        });
      }
    }
  }, [availableBackupStorages, mode, pitrEnabled, pitrStorageLocation]);

  if (!pitrEnabled) {
    return null;
  }

  if (dbType === DbType.Mysql) {
    return (
      <AutoCompleteAutoFill
        name={DbWizardFormFields.pitrStorageLocation}
        label={StorageLocationMessages.storageLocation.label}
        loading={loadingBackupStorages}
        options={backupStorages}
        isRequired
        enableFillFirst={mode === 'new'}
      />
    );
  }

  return (
    <Typography variant="body1">
      {Messages.matchedStorageType(
        typeof locationToUse === 'object' ? locationToUse.name : locationToUse
      )}
    </Typography>
  );
};
export default PitrStorage;
