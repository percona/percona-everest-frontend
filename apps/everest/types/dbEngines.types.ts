export enum DbEngineType {
  PSMDB = 'psmdb',
  PXC = 'pxc',
  PG = 'pg'
}

export enum DbEngineStatus {
  INSTALLED = 'installed',
}

export type GetDbEnginesPayload = {
  items: Array<{
    spec: {
      type: DbEngineType
    },
    status: {
      status: DbEngineStatus,
      version: string
    }
  }>
}

export type DbEngine = {
  type: DbEngineType,
  status: DbEngineStatus,
  version: string
}
