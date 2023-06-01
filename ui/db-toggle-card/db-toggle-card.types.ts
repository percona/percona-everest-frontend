import { ToggleCardProps } from '@percona/ui-lib.toggle-card';

// TODO export to another scope when this needs to be reused
export enum DbType {
  Postresql = 'postgresql',
  Mongo = 'mongodb',
  Mysql = 'mysql',
}

export type DbToggleCardProps = { value: DbType } & ToggleCardProps;
