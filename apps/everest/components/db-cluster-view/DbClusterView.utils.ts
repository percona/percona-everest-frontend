import { DbClusterStatus } from '../../types/dbCluster.types';
import { Messages } from './dbClusterView.messages';

const DB_CLUSTER_STATUS_HUMANIFIED: Record<DbClusterStatus, string> = {
  [DbClusterStatus.ready]: Messages.statusProvider.up,
  [DbClusterStatus.error]: Messages.statusProvider.down,
  [DbClusterStatus.initializing]: Messages.statusProvider.initializing,
  [DbClusterStatus.pausing]: Messages.statusProvider.pausing,
  [DbClusterStatus.paused]: Messages.statusProvider.paused,
  [DbClusterStatus.stopping]: Messages.statusProvider.stopping,
  [DbClusterStatus.unknown]: Messages.statusProvider.unknown,
};

export const beautifyDbClusterStatus = (status: DbClusterStatus): string =>
  DB_CLUSTER_STATUS_HUMANIFIED[status] || Messages.statusProvider.unknown;
