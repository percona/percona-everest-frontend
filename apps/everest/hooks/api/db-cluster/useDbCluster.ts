import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from 'react-query';
import { DbWizardType } from '../../../pages/new-database/new-database.types';
import { ClusterCredentials, DbCluster, GetDbClusterCredentialsPayload, ProxyExposeType } from '../../../types/dbCluster.types';
import { dbTypeToDbEngine } from '../../../utils/db';
import { createDbClusterFn, getDbClusterCredentialsFn } from '../../../api/dbClusterApi';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
// import {getCronExpressionFromFormValues} from "../../components/time-selection/time-selection.utils";
// import {TimeValue, WeekDays} from "../../components/time-selection/time-selection.types";

type CreateDbClusterArgType = { dbPayload: DbWizardType; id: string };

const formValuesToPayloadMapping = (dbPayload: DbWizardType): DbCluster => {
  // const { selectedTime, minute, hour, amPm, onDay, weekDay } = dbPayload;
  // const backupSchedule = getCronExpressionFromFormValues({selectedTime, minute, hour, amPm, onDay, weekDay});

  // TODO re-add payload after API is ready
  const dbClusterPayload: DbCluster = {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: {
      name: dbPayload.dbName,
    },
    spec: {
      // backup: {
      //   enabled: dbPayload.backupsEnabled,
      //   ...(dbPayload.backupsEnabled && {
      //     schedules: [
      //       {
      //         enabled: true,
      //         name: '',
      //         objectStorageName: '',
      //         schedule: backupSchedule, // TODO CRON Expression
      //       },
      //     ],
      //   }),
      // },
      engine: {
        type: dbTypeToDbEngine(dbPayload.dbType),
        version: dbPayload.dbVersion,
        replicas: +dbPayload.numberOfNodes,
        resources: {
          cpu: dbPayload.cpu,
          memory: `${dbPayload.memory}G`,
        },
        storage: {
          size: `${dbPayload.disk}G`,
        },
      },
      // monitoring: {
      //   enabled: dbPayload.monitoring,
      //   ...(!!dbPayload.monitoring && {
      //     pmm: {
      //       publicAddress: dbPayload.endpoint || '',
      //     }
      //   })
      // },
      proxy: {
        replicas: +dbPayload.numberOfNodes,
        expose: {
          type: dbPayload.externalAccess
            ? ProxyExposeType.external
            : ProxyExposeType.internal,
          ...(!!dbPayload.externalAccess &&
            dbPayload.sourceRange && {
              ipSourceRanges: [dbPayload.sourceRange],
            }),
        },
      },
    },
  };

  return dbClusterPayload;
};

export const useCreateDbCluster = (
  options?: UseMutationOptions<any, unknown, CreateDbClusterArgType, unknown>
) => {
  return useMutation(
    ({ dbPayload, id }: CreateDbClusterArgType) =>
      createDbClusterFn(formValuesToPayloadMapping(dbPayload), id),
    { ...options }
  );
};

export const useDbClusterCredentials = (
    dbClusterName: string,
    options?: UseQueryOptions<ClusterCredentials>,
  ) => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<GetDbClusterCredentialsPayload, unknown, ClusterCredentials>(
    `cluster-credentials-${name}`,
    () => getDbClusterCredentialsFn(id, dbClusterName),
    {...options},
  );
}