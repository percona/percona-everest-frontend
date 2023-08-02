import { DbType } from '@percona/ui-lib.db-toggle-card';
import { ReactNode } from 'react';
import { DbClusterStatus } from '../../types/dbCluster.types';
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
