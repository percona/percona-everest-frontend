import { useMutation, UseMutationOptions } from 'react-query';
import { updateDbClusterFn } from '../../../api/dbClusterApi';
import { getCronExpressionFromFormValues } from '../../../components/time-selection/time-selection.utils';
import { ScheduledBackupFormData } from '../../../pages/db-cluster-details/backups/scheduled-backup-modal/scheduled-backup-modal.types';
import { DbCluster } from '../../../types/dbCluster.types';
import { useDbCluster } from '../db-cluster/useDbCluster';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';

const newBackupScheduleFormValuesToDbClusterPayload = (
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
            name,
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

const deletedScheduleToDbClusterPayload = (
  scheduleName: string,
  dbCluster: DbCluster
): DbCluster => {
  const schedules = dbCluster?.spec?.backup?.schedules;
  const filteredSchedules = schedules.filter(
    (item) => item?.name !== scheduleName
  );

  return {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: dbCluster.metadata,
    spec: {
      ...dbCluster?.spec,
      backup: {
        enabled: true,
        schedules: filteredSchedules,
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
      const payload = newBackupScheduleFormValuesToDbClusterPayload(
        dbPayload,
        dbCluster!
      );
      return updateDbClusterFn(clusterId, dbClusterName, payload);
    },
    { ...options }
  );
};

export const useDeleteSchedule = (
  dbClusterName: string,
  options?: UseMutationOptions<any, unknown, string, unknown>
) => {
  const { id: clusterId } = useSelectedKubernetesCluster();
  const { data: dbCluster } = useDbCluster(dbClusterName);

  return useMutation(
    (scheduleName) => {
      const payload = deletedScheduleToDbClusterPayload(
        scheduleName,
        dbCluster
      );
      return updateDbClusterFn(clusterId, dbClusterName, payload);
    },
    { ...options }
  );
};
