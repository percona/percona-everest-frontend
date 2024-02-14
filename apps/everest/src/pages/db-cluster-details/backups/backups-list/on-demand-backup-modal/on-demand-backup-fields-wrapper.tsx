import { TextInput } from '@percona/ui-lib';
import { AutoCompleteAutoFill } from 'components/auto-complete-auto-fill/auto-complete-auto-fill';
import { ScheduleFormFields } from 'components/schedule-form/schedule-form.types';
import { useBackupStorages } from 'hooks/api/backup-storages/useBackupStorages.ts';
import { useDbCluster } from 'hooks/api/db-cluster/useDbCluster.ts';
import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Messages } from '../../../db-cluster-details.messages.ts';
import { BackupFields } from './on-demand-backup-modal.types.ts';

export const OnDemandBackupFieldsWrapper = () => {
  const { dbClusterName, namespace = '' } = useParams();
  const { setValue } = useFormContext();
  const { data: dbCluster } = useDbCluster(dbClusterName!, namespace, {
    enabled: !!dbClusterName,
  });
  const { data: backupStorages = [], isFetching } = useBackupStorages();

  const availableBackupStorages = useMemo(
    () =>
      dbCluster?.metadata.namespace
        ? backupStorages.filter((item) =>
            item.targetNamespaces.includes(dbCluster?.metadata.namespace)
          )
        : [],
    [dbCluster?.metadata?.namespace, backupStorages]
  );

  const dbClusterActiveStorage = dbCluster?.status?.activeStorage;

  useEffect(() => {
    if (dbClusterActiveStorage) {
      setValue(ScheduleFormFields.storageLocation, {
        name: dbClusterActiveStorage,
      });
    }
  }, [dbClusterActiveStorage]);

  return (
    <>
      <TextInput
        name={BackupFields.name}
        label={Messages.onDemandBackupModal.backupName}
        isRequired
      />
      <AutoCompleteAutoFill
        name={BackupFields.storageLocation}
        label={Messages.onDemandBackupModal.backupStorage}
        loading={isFetching}
        options={availableBackupStorages}
        enableFillFirst
        isRequired
        disabled={!!dbClusterActiveStorage}
      />
    </>
  );
};
