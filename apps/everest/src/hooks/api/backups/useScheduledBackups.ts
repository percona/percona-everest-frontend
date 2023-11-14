import { useMutation, UseMutationOptions } from 'react-query';
import { updateDbClusterFn } from 'api/dbClusterApi';
import { getCronExpressionFromFormValues } from 'components/time-selection/time-selection.utils';
import { ScheduleFormData } from 'pages/db-cluster-details/backups/scheduled-backup-modal/scheduled-backup-modal-form/scheduled-backup-modal-form.types';
import { DbCluster, Schedule } from 'shared-types/dbCluster.types';
import { useDbCluster } from '../db-cluster/useDbCluster';

const backupScheduleFormValuesToDbClusterPayload = (
  dbPayload: ScheduleFormData,
  dbCluster: DbCluster,
  mode: 'edit' | 'new'
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
  let schedulesPayload: Schedule[] = [];
  if (mode === 'new') {
    schedulesPayload = [
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
    ];
  }

  if (mode === 'edit') {
    const newSchedulesArray = dbCluster?.spec?.backup?.schedules && [
      ...(dbCluster?.spec?.backup?.schedules || []),
    ];
    const editedScheduleIndex = newSchedulesArray?.findIndex(
      (item) => item.name === name
    );
    if (newSchedulesArray && editedScheduleIndex !== undefined) {
      newSchedulesArray[editedScheduleIndex] = {
        enabled: true,
        name,
        backupStorageName:
          typeof dbPayload.storageLocation === 'string'
            ? dbPayload.storageLocation
            : dbPayload.storageLocation!.name,
        schedule: backupSchedule,
      };
      schedulesPayload = newSchedulesArray;
    }
  }

  return {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: dbCluster.metadata,
    spec: {
      ...dbCluster?.spec,
      backup: {
        enabled: true,
        schedules: schedulesPayload,
      },
    },
  };
};

const deletedScheduleToDbClusterPayload = (
  scheduleName: string,
  dbCluster: DbCluster
): DbCluster => {
  const schedules = dbCluster?.spec?.backup?.schedules || [];
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

export const useUpdateSchedules = (
  dbClusterName: string,
  mode: 'new' | 'edit',
  options?: UseMutationOptions<unknown, unknown, ScheduleFormData, unknown>
) => {
  const { data: dbCluster } = useDbCluster(dbClusterName);

  return useMutation(
    (dbPayload: ScheduleFormData) => {
      const payload = backupScheduleFormValuesToDbClusterPayload(
        dbPayload,
        dbCluster!,
        mode
      );
      return updateDbClusterFn(dbClusterName, payload);
    },
    { ...options }
  );
};

export const useDeleteSchedule = (
  dbClusterName: string,
  options?: UseMutationOptions<unknown, unknown, string, unknown>
) => {
  const { data: dbCluster } = useDbCluster(dbClusterName);

  return useMutation(
    (scheduleName) => {
      const payload = deletedScheduleToDbClusterPayload(
        scheduleName,
        dbCluster!
      );
      return updateDbClusterFn(dbClusterName, payload);
    },
    { ...options }
  );
};