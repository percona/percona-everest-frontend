import { DbType } from '@percona/ui-lib.db-toggle-card';

export const DB_VERSIONS: Record<DbType, string[]> = {
  [DbType.Mysql]: [
    'percona/percona-xtradb-cluster:8.0.31-23.2',
    'percona/percona-xtradb-cluster:8.0.29-21.1',
    'percona/percona/percona-xtradb-cluster:8.0.27-18.1',
  ],
  [DbType.Mongo]: [
    'percona/percona-server-mongodb:5.0.7-6',
    'percona/percona-server-mongodb:5.0.4-3',
    'percona/percona-server-mongodb:5.0.2-1',
  ],
  [DbType.Postresql]: [
    'percona/percona-postgresql-operator:1.4.0-ppg14-postgres-ha',
    'percona/percona-postgresql-operator:1.4.0-ppg13-postgres-ha',
    'percona/percona-postgresql-operator:1.4.0-ppg12-postgres-ha',
  ],
};
