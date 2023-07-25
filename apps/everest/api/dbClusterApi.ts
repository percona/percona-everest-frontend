import { api } from './api';

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
  cpu: number;
  memory: number;
}

interface Storage {
  class?: string;
  size: number;
}

interface Engine {
  replicas: number;
  resources?: Resources;
  storage: Storage;
  type: string;
  version?: string;
}

interface Proxy {
  replicas: number;
  expose: {
    type: 'internal' | 'external',
    ipSourceRanges?: string[],
  }
}
interface Spec {
  backup?: Backup;
  engine: Engine;
  proxy: Proxy;
}
export interface CreateDBClusterPayload {
  apiVersion: string;
  kind: 'DatabaseCluster';
  metadata: {
    name: string;
  };
  spec: Spec;
}

export const createDbClusterFn = async (
  data: CreateDBClusterPayload,
  clusterId: string
) => {
  const response = await api.post(
    `kubernetes/${clusterId}/database-clusters`,
    data
  );

  return response.data;
};
