export interface DbClusterRaw {
  status: { status: DbClusterStatus };
  metadata: { name: string };
  spec: {
    databaseType: DbTypeIcon;
    databaseImage: string;
    backups?: { enabled: boolean };
  };
}

export interface DatabaseClusterList {
  items: DbClusterRaw[];
}

export interface DbCluster {
  status: DbClusterStatus;
  dbTypeIcon: DbTypeIcon;
  dbVersion: string | null;
  backupsEnabled: boolean;
  kubernetesCluster: string;
  databaseName: string;
}

export enum DbTypeIcon {
  pxc = 'pxc',
  psmdb = 'psmdb',
  postgresql = 'postgresql',
}

export enum DbClusterStatus {
  unknown = 'unknown',
  initializing = 'initializing',
  paused = 'paused',
  pausing = 'pausing',
  stopping = 'stopping',
  ready = 'ready',
  error = 'error',
}
