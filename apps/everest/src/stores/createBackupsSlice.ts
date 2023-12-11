import { DbCluster } from 'shared-types/dbCluster.types';
import { StateCreator } from 'zustand';

export interface BackupsSlice {
  setDbCluster: (dbCluster: DbCluster) => void;
  dbCluster: DbCluster | null;
}

export const createBackupsSlice: StateCreator<BackupsSlice> = (set) => ({
  dbCluster: null,
  setDbCluster: (dbCluster: DbCluster) => set({ dbCluster }),
});
