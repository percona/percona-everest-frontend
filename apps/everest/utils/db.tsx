import { DbType } from "@percona/ui-lib.db-toggle-card";
import { MongoIcon, MySqlIcon, PostgreSqlIcon } from "@percona/ui-lib.icons.db";
import { DbEngineType } from "../types/dbEngines.types";

export const dbEngineToDbType = (dbEngine: DbEngineType): DbType => {
  switch (dbEngine) {
    case DbEngineType.PSMDB:
      return DbType.Mongo
    case DbEngineType.PXC:
      return DbType.Mysql;
    default:
      return DbType.Postresql;
  }
}

export const dbTypeToIcon = (dbType: DbType) => {
  switch (dbType) {
    case DbType.Mongo:
      return MongoIcon;
    case DbType.Mysql:
      return MySqlIcon;
    default:
      return PostgreSqlIcon;
  }
}
