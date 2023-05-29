import { ToggleCardProps } from '@percona/ui.toggle-card';

// TODO export to another scope when this needs to be reused
export enum DbType {
  Postresql = 'postgresql',
  Mongo = 'mongodb',
  Mysql = 'mysql',
}

export type DbToggleCardProps = { value: DbType } & ToggleCardProps;
