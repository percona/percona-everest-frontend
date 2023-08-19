import { getK8sClusters } from './k8sClusters';
import { APIRequestContext, expect } from '@playwright/test';
import { DbCluster, ProxyExposeType } from '../../../types/dbCluster.types';
import { dbTypeToDbEngine } from '../../../utils/db';
import { DbWizardType } from '../../../pages/database-form/database-form.types';
import { DbType } from '../../../../../ui-lib/db-toggle-card';
import { getEnginesVersions } from './database-engines';
export const createDbCluster = async (
  request: APIRequestContext,
  customOptions?: DbWizardType
) => {
  const k8sClusterId = (await getK8sClusters(request))[0].id;
  const dbEngines = await getEnginesVersions(request, k8sClusterId);
  const dbType = customOptions?.dbType || DbType.Mysql;
  const dbEngineType = dbTypeToDbEngine(dbType);
  const dbTypeVersions = dbEngines[dbEngineType];
  const lastVersion = dbTypeVersions[dbTypeVersions.length - 1];

  const payload: DbCluster = {
    apiVersion: 'everest.percona.com/v1alpha1',
    kind: 'DatabaseCluster',
    metadata: {
      name: customOptions?.dbName || 'db-cluster-test-ui',
    },
    spec: {
      engine: {
        type: dbEngineType,
        version: customOptions?.dbVersion || lastVersion,
        replicas: +customOptions?.numberOfNodes || 1,
        resources: {
          cpu: customOptions?.cpu || 1,
          memory: `${customOptions?.memory || 2}G`,
        },
        storage: {
          size: `${customOptions?.disk || 25}G`,
        },
      },
      proxy: {
        replicas: +customOptions?.numberOfNodes || 1,
        expose: {
          type:
            customOptions?.externalAccess || false
              ? ProxyExposeType.external
              : ProxyExposeType.internal,
          ...(!!(customOptions?.externalAccess || false) &&
            (customOptions?.sourceRange || ['181.170.213.40']) && {
              ipSourceRanges: [customOptions?.sourceRange] || [
                '181.170.213.40',
              ],
            }),
        },
      },
    },
  };

  const response = await request.post(
    `/v1/kubernetes/${k8sClusterId}/database-clusters`,
    {
      data: payload,
    }
  );
  expect(response.ok()).toBeTruthy();
};
