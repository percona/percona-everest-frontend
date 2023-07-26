import { ReactNode } from 'react';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { DbEngineType } from '../../types/dbEngines.types';
import { DbClusterStatus } from '../../types/dbCluster.types';

export interface DbClusterViewProps {
  customHeader: ReactNode;
}

export interface DbTypeIconProviderProps {
  dbType: DbEngineType | DbType;
}

export interface StatusProviderProps {
  status: DbClusterStatus;
}
