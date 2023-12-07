import { StateCreator } from 'zustand';

export interface BackupsSlice {
  setDbClusterName: (dbClusterName: string) => void;
  dbClusterName: string;
    isNewClusterMode: boolean;
}

export const createBackupsSlice: StateCreator<BackupsSlice> = (set) => ({
  dbClusterName: '',
    isNewClusterMode: false,
  setDbClusterName: (dbClusterName: string) => set({ dbClusterName }),
});
