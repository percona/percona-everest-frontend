export enum DbEngine {
  PSMDB = 'psmdb',
  PXB = 'pxc'
}

export enum DbEngineStatus {
  INSTALLED = 'installed',
}

export type GetDbEnginesPayload = {
  items: Array<{
    spec: {
      type: DbEngine
    },
    status: {
      status: DbEngineStatus,
      version: string
    }
  }>
}