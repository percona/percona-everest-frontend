import {
  MongoLeafIcon,
  MySqlDolphinIcon,
  PostgreSqlElephantIcon,
} from '@percona/ui-lib';
import { DbType } from '@percona/types';
import { DbTypeIconProviderProps } from '../dbClusterView.types';
import { DbEngineType } from '@/types/dbEngines.types';

export const DbTypeIconProvider = ({ dbType }: DbTypeIconProviderProps) => {
  // In case users sent db type instead of engine
  switch (dbType) {
    case DbEngineType.PXC:
    case DbType.Mysql:
      return <MySqlDolphinIcon />;
    case DbEngineType.PSMDB:
    case DbType.Mongo:
      return <MongoLeafIcon />;
    case DbEngineType.POSTGRESQL:
    case DbType.Postresql:
      return <PostgreSqlElephantIcon />;
    default:
      return null;
  }
};
