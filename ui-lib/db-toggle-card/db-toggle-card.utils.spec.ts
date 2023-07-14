import { DbType } from './db-toggle-card.types';
import { humanizeDbType } from './db-toggle-card.utils';

describe('DBToggleCard utils', () => {
  test('humanizeDbType', () => {
    expect(humanizeDbType(DbType.Mongo)).toBe('MongoDB');
    expect(humanizeDbType(DbType.Mysql)).toBe('MySQL');
    expect(humanizeDbType(DbType.Postresql)).toBe('PostgreSQL');
  });
});
