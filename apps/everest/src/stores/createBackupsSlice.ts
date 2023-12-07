import { StateCreator } from 'zustand';

export interface BackupsSlice {
  setDbClusterName: (dbClusterName: string) => void;
  dbClusterName: string;
}

export const createBackupsSlice: StateCreator<BackupsSlice> = (set) => ({
  dbClusterName: '',
  setDbClusterName: (dbClusterName: string) => set({ dbClusterName }),
});
