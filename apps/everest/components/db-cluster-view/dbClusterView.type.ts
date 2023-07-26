import { ReactNode } from 'react';
import { DbClusterStatus } from '../../hooks/db-clusters/dbCluster.type';
export interface DbClusterViewProps {
  customHeader: ReactNode;
}
export interface DbTypeIconProviderProps {
  dbType: string;
}

export interface StatusProviderProps {
  status: DbClusterStatus;
}
