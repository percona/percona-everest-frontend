import { ReactNode } from 'react';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { DbClusterStatus } from '../../hooks/db-clusters/dbCluster.type';
import { DbEngineType } from '../../types/dbEngines.types';

export interface DbClusterViewProps {
  customHeader: ReactNode;
}
export interface DbTypeIconProviderProps {
  dbType: DbEngineType | DbType;
}

export interface StatusProviderProps {
  status: DbClusterStatus;
}
