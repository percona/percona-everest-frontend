// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { DbCluster, DbClusterStatus } from 'shared-types/dbCluster.types';
import { Messages } from './dbClusterView.messages';
import { DbClusterTableElement } from './dbClusterView.types';

const DB_CLUSTER_STATUS_HUMANIFIED: Record<DbClusterStatus, string> = {
  [DbClusterStatus.ready]: Messages.statusProvider.up,
  [DbClusterStatus.error]: Messages.statusProvider.down,
  [DbClusterStatus.initializing]: Messages.statusProvider.initializing,
  [DbClusterStatus.pausing]: Messages.statusProvider.pausing,
  [DbClusterStatus.paused]: Messages.statusProvider.paused,
  [DbClusterStatus.stopping]: Messages.statusProvider.stopping,
  [DbClusterStatus.unknown]: Messages.statusProvider.unknown,
  [DbClusterStatus.restoring]: Messages.statusProvider.restoring,
};

export const beautifyDbClusterStatus = (status: DbClusterStatus): string =>
  DB_CLUSTER_STATUS_HUMANIFIED[status] || Messages.statusProvider.unknown;

export const convertDbClusterPayloadToTableFormat = (
  data: DbCluster[]
): DbClusterTableElement[] =>
  data.map((cluster) => ({
    status: cluster.status ? cluster.status.status : DbClusterStatus.unknown,
    dbType: cluster.spec.engine.type,
    dbVersion: cluster.spec.engine.version || '',
    backupsEnabled: !!cluster.spec.backup?.enabled,
    databaseName: cluster.metadata.name,
    cpu: cluster.spec.engine.resources?.cpu || '',
    memory: cluster.spec.engine.resources?.memory || '',
    storage: cluster.spec.engine.storage.size,
    nodes: cluster.spec.engine.replicas,
    hostName: cluster.status ? cluster.status.hostname : '',
    exposetype: cluster.spec.proxy.expose.type,
    port: cluster.status?.port,
    raw: cluster,
  }));
