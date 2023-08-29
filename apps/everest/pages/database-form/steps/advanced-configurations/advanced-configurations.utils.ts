import { DbType } from '@percona/ui-lib.db-toggle-card';

export const getParamsPlaceholderFromDbType = (dbType: DbType) => {
  let dynamicText = '';

  switch (dbType) {
    case DbType.Mongo:
      dynamicText = 'mode: slowOp';
      break;
    case DbType.Mysql:
      dynamicText = 'max_allowed_packet=128M';
      break;
    case DbType.Postresql:
    default:
      dynamicText = 'shared_buffers = 128MB';
      break;
  }

  return `Insert parameters ${dynamicText && `(e.g. ${dynamicText})`}`;
};
