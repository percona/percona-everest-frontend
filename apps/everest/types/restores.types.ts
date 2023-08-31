import { DbType } from '@percona/ui-lib.db-toggle-card';

export type RestorePayload = {
  apiVersion: 'everest.percona.com/v1alpha1';
  kind: 'DatabaseClusterRestore';
  metadata: {
    name: string;
  };
  spec: {
    databaseCluster: string;
    databaseType: DbType;
    backupName: string;
  };
};
