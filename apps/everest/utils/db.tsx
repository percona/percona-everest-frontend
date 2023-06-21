import { DbType } from "@percona/ui-lib.db-toggle-card";
import { DbEngine } from "../types/dbEngines.types";

export const dbEngineToDbType = (dbEngine: DbEngine): DbType => {
  switch (dbEngine) {
    case DbEngine.PSMDB:
      return DbType.Mongo
    case DbEngine.PXC:
      return DbType.Mysql
    default:
      return DbType.Mysql
  }
}