import {
  DbClusterStatus,
  ProxyExposeType,
} from '../../../types/dbCluster.types';
import { DbEngineType } from '../../../types/dbEngines.types';

export interface DbClusterTableElement {
  status: DbClusterStatus;
  dbType: DbEngineType;
  dbVersion: string;
  backupsEnabled: boolean;
  kubernetesCluster: string;
  databaseName: string;
  cpu: string | number;
  memory: string | number;
  storage: string | number;
  hostName: string;
  port?: number;
  exposetype: ProxyExposeType;
}
