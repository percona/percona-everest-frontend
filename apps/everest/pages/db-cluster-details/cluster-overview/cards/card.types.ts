import { DbType } from '@percona/ui-lib.db-toggle-card';

export type OverviewCardProps = {
  loading?: boolean;
};

export type DatabaseDetailsOverviewCardProps = {
  name: string;
  namespace: string;
  type: DbType;
  version: string;
  numberOfNodes: number;
  cpu: number | string;
  memory: number | string;
  disk: number | string;
  externalAccess: boolean;
  monitoring: boolean;
} & OverviewCardProps;

export type ConnectionDetailsOverviewCardProps = {
  loadingClusterDetails: boolean;
  hostname: string;
  port: number;
  username: string;
  password: string;
} & OverviewCardProps;
