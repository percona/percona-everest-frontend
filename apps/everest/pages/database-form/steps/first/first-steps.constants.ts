import { DbType } from "@percona/ui-lib.db-toggle-card";

export const DEFAULT_NODES: Record<DbType, string> = {
  [DbType.Mongo]: '3',
  [DbType.Mysql]: '3',
  [DbType.Postresql]: '2',
};
