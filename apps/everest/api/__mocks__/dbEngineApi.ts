import {
  DbEngineStatus,
  DbEngineType,
  GetDbEnginesPayload,
} from '../../types/dbEngines.types';

export const getDbEnginesFn = async (): Promise<GetDbEnginesPayload> => {
  return {
    items: [
      {
        spec: {
          type: DbEngineType.PXC,
        },
        status: {
          status: DbEngineStatus.INSTALLED,
          availableVersions: {
            backup: {},
            engine: {},
            proxy: {},
          },
          operatorVersion: '1.0.0,',
        },
      },
      {
        spec: {
          type: DbEngineType.PSMDB,
        },
        status: {
          status: DbEngineStatus.INSTALLED,
          availableVersions: {
            backup: {},
            engine: {},
            proxy: {},
          },
          operatorVersion: '1.0.0,',
        },
      },
    ],
  };
};
