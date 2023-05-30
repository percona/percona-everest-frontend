import { DbType } from './db-toggle-card.types';

const humanizedDbMap: Record<DbType, string> = {
  [DbType.Postresql]: 'PostgreSQL',
  [DbType.Mongo]: 'MongoDB',
  [DbType.Mysql]: 'MySQL',
};

export const humanizeDbType = (type: DbType): string => humanizedDbMap[type];
