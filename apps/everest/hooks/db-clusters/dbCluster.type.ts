export interface DbClusterRaw {
  status: { status: DbClusterStatus; hostname: string };
  metadata: { name: string };
  spec: {
    proxy: {
      expose: {
        type: ProxyExposeType;
      };
    };
    backup: {
      enabled: boolean;
    };
    engine: {
      type: DbType;
      version: string;
      resources: {
        cpu: string;
        memory: string;
      };
      storage: {
        size: string;
      };
    };
  };
}

export enum ProxyExposeType {
  internal = 'internal',
  external = 'external',
}

export interface DatabaseClusterList {
  items: DbClusterRaw[];
}

export interface DbCluster {
  status: DbClusterStatus;
  dbType: DbType;
  dbVersion: string;
  backupsEnabled: boolean;
  kubernetesCluster: string;
  databaseName: string;
  cpu: string;
  memory: string;
  storage: string;
  hostName: string;
  exposetype: ProxyExposeType
}

export enum DbType {
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
