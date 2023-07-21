import { UseMutationOptions, useMutation } from 'react-query';
import { DbWizardType } from '../../pages/new-database/new-database.types';
import {
  createDbClusterFn,
  CreateDBClusterPayload,
} from '../../api/dbClusterApi';

type CreateDbClusterArgType = { dbPayload: DbWizardType; id: string };

const formValuesToPayloadMapping = (
  dbPayload: DbWizardType
): CreateDBClusterPayload => {
  const dbClusterPayload: CreateDBClusterPayload = {
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
      //         schedule: '', // TODO CRON Expression
      //       },
      //     ],
      //   }),
      // },
      engine: {
        type: dbPayload.dbType,
        version: dbPayload.dbVersion,
        replicas: +dbPayload.numberOfNodes,
        resources: {
          cpu: dbPayload.cpu,
          memory: dbPayload.memory,
        },
        storage: {
          size: dbPayload.disk,
        },
      },
      // dataSource: {
      //   backupName: '', // TODO StorageLocation id?
      //   objectStorageName: '', // TODO StorageLocation name?
      // },
      monitoring: {
        enabled: dbPayload.monitoring,
        ...(!!dbPayload.monitoring && {
          pmm: {
            publicAddress: dbPayload.endpoint || '',
          }
        })
      },
      proxy: {
        replicas: +dbPayload.numberOfNodes,
        expose: {
          type: dbPayload.externalAccess ? 'external' : 'internal',
          ...(!!dbPayload.externalAccess && dbPayload.sourceRange && {
            ipSourceRanges: [dbPayload.sourceRange],
          })
        }
      }
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
