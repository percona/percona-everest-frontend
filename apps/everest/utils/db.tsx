import { DbType } from '@percona/ui-lib.db-toggle-card';
import { DbEngineType } from '../types/dbEngines.types';

export const dbEngineToDbType = (dbEngine: DbEngineType): DbType => {
  switch (dbEngine) {
    case DbEngineType.PSMDB:
      return DbType.Mongo;
    case DbEngineType.PXC:
      return DbType.Mysql;
    default:
      return DbType.Postresql;
  }
};

export const dbTypeToDbEngine = (dbType: DbType): DbEngineType => {
  switch (dbType) {
    case DbType.Mongo:
      return DbEngineType.PSMDB;
    case DbType.Mysql:
      return DbEngineType.PXC;
    default:
      return DbEngineType.POSTGRESQL;
  }
};
