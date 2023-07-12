export enum DbEngineType {
  PSMDB = 'psmdb',
  PXC = 'pxc',
  POSTGRESQL = 'postgresql',
}

export enum DbEngineStatus {
  INSTALLED = 'installed',
  NOT_INSTALLED = 'not installed'
}

export enum DbEngineToolStatus {
  AVAILABLE = 'available',
  RECOMMENDED = 'recommended'
}

export type EngineToolPayload = {
  description: string;
  imagePath: string;
  imageHash: string;
  status: DbEngineToolStatus;
}

export type GetDbEnginesPayload = {
  items: Array<{
    spec: {
      type: DbEngineType;
    };
    status: {
      status: DbEngineStatus;
      availableVersions: {
        backup: Record<string, EngineToolPayload>;
        engine: Record<string, EngineToolPayload>;
        proxy: Record<string, EngineToolPayload>;
      };
      operatorVersion: string;
    };
  }>;
};

type DbEngineTool = {
  version: string;
} & EngineToolPayload;

export type DbEngine = {
  type: DbEngineType;
  status: DbEngineStatus;
  operatorVersion: string;
  availableVersions: {
    backup: DbEngineTool[];
    engine: DbEngineTool[];
    proxy: DbEngineTool[];
  }
};
