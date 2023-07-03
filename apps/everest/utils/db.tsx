import { DbType } from "@percona/ui-lib.db-toggle-card";
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
