import { DbEngineType } from './dbEngines.types';

export enum ProxyExposeType {
  internal = 'internal',
  external = 'external',
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

interface Schedule {
  enabled: boolean;
  name: string;
  objectStorageName: string;
  retentionCopies?: number;
  schedule: string;
}
interface Backup {
  enabled: boolean;
  schedules?: Array<Schedule>;
}

interface Resources {
  cpu: number | string;
  memory: number | string;
}

interface Storage {
  class?: string;
  size: number | string;
}

interface Engine {
  replicas: number;
  resources?: Resources;
  storage: Storage;
  type: DbEngineType;
  version?: string;
}

interface Proxy {
  replicas: number;
  expose: {
    type: ProxyExposeType;
    ipSourceRanges?: string[];
  };
}

export interface Spec {
  backup?: Backup;
  engine: Engine;
  proxy: Proxy;
}

export interface StatusSpec {
  status: DbClusterStatus;
  hostname: string;
}

export interface DbCluster {
  apiVersion: string;
  kind: 'DatabaseCluster';
  metadata: {
    name: string;
  };
  spec: Spec;
}

export type GetDbClustersPayload = {
  items: Array<
    DbCluster & {
      status?: StatusSpec;
    }
  >;
};

