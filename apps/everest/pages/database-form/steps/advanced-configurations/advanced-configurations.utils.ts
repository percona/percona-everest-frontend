import { DbType } from '@percona/ui-lib.db-toggle-card';

export const getParamsPlaceholderFromDbType = (dbType: DbType) => {
  let dynamicText = '';

  switch (dbType) {
    case DbType.Mongo:
      dynamicText =
        'operationProfiling:\n' + 'mode: slowOp\n' + 'slowOpThresholdMs: 200';
      break;
    case DbType.Mysql:
      dynamicText =
        '[mysqld]\n' +
        'key_buffer_size=16M\n' +
        'max_allowed_packet=128M\n' +
        'max_connections=250';
      break;
    case DbType.Postresql:
    default:
      dynamicText =
        'log_connections = yes\n' +
        'search_path = \'"$user", public\'\n' +
        'shared_buffers = 128MB';
      break;
  }

  return `Insert parameters:\n${dynamicText && `${dynamicText}`}`;
};
