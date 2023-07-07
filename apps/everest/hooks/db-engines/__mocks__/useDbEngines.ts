import { DbEngineStatus, DbEngineType } from "../../../types/dbEngines.types";

export const useDbEngines = () => {
  return {
    data: [{
      type: DbEngineType.PXC,
      status: DbEngineStatus.INSTALLED,
      version: '1.0.0',
    },
    {
      type: DbEngineType.PSMDB,
      status: DbEngineStatus.INSTALLED,
      version: '1.0.0',
    }],
    isFetching: false,
  }
};
