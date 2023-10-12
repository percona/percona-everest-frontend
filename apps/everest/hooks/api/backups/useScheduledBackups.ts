import { useMutation, UseMutationOptions } from 'react-query';
import { updateDbClusterFn } from '../../../api/dbClusterApi';
import { getCronExpressionFromFormValues } from '../../../components/time-selection/time-selection.utils';
import { ScheduledBackupFormData } from '../../../pages/db-cluster-details/backups/scheduled-backup-modal/scheduled-backup-modal.types';
import { DbCluster } from '../../../types/dbCluster.types';
import { useDbCluster } from '../db-cluster/useDbCluster';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';

const formValuesForScheduledBackups = (
  dbPayload: ScheduledBackupFormData,
  dbCluster: DbCluster
): DbCluster => {
  const { selectedTime, minute, hour, amPm, onDay, weekDay, name } = dbPayload;
  const backupSchedule = getCronExpressionFromFormValues({
    selectedTime,
    minute,
    hour,
    amPm,
    onDay,
    weekDay,
  });

  return {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: dbCluster.metadata,
    spec: {
      ...dbCluster?.spec,
      backup: {
        enabled: true,
        schedules: [
          ...(dbCluster.spec.backup?.schedules ?? []),
          {
            enabled: true,
            name: name,
            backupStorageName:
              typeof dbPayload.storageLocation === 'string'
                ? dbPayload.storageLocation
                : dbPayload.storageLocation!.name,
            schedule: backupSchedule,
          },
        ],
      },
    },
  };
};

export const useCreateScheduledBackup = (
  dbClusterName: string,
  options?: UseMutationOptions<any, unknown, ScheduledBackupFormData, unknown>
) => {
  const { id: clusterId } = useSelectedKubernetesCluster();
  const { data: dbCluster } = useDbCluster(dbClusterName);

  return useMutation(
    (dbPayload: ScheduledBackupFormData) => {
      const payload = formValuesForScheduledBackups(dbPayload, dbCluster!);
      return updateDbClusterFn(clusterId, dbClusterName, payload);
    },
    { ...options }
  );
};
