import { MongoIcon, MySqlIcon, PostgreSqlIcon } from '../../../../packages/ui-lib/src';
import { DbType } from '../../../../packages/types/src';
import { DbEngineType } from '../types/dbEngines.types';
export const dbEngineToDbType = (dbEngine) => {
    switch (dbEngine) {
        case DbEngineType.PSMDB:
            return DbType.Mongo;
        case DbEngineType.PXC:
            return DbType.Mysql;
        default:
            return DbType.Postresql;
    }
};
export const dbTypeToDbEngine = (dbType) => {
    switch (dbType) {
        case DbType.Mongo:
            return DbEngineType.PSMDB;
        case DbType.Mysql:
            return DbEngineType.PXC;
        default:
            return DbEngineType.POSTGRESQL;
    }
};
export const dbTypeToIcon = (dbType) => {
    switch (dbType) {
        case DbType.Mongo:
            return MongoIcon;
        case DbType.Mysql:
            return MySqlIcon;
        default:
            return PostgreSqlIcon;
    }
};
export const beautifyDbTypeName = (dbType) => {
    switch (dbType) {
        case DbType.Mongo:
            return 'MongoDB';
        case DbType.Mysql:
            return 'MySQL';
        default:
            return 'PostgreSQL';
    }
};
//# sourceMappingURL=db.js.map