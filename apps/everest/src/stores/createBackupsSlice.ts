import { StateCreator } from 'zustand';

export interface BackupsSlice {
  isOpenRestoreDbModal: boolean;
  openRestoreDbModal: (dbClusterName: string) => void;
  closeRestoreDbModal: () => void;
  dbClusterName: string;
}

export const createBackupsSlice: StateCreator<BackupsSlice> = (set) => ({
  isOpenRestoreDbModal: false,
  dbClusterName: '',
  openRestoreDbModal: (dbClusterName) =>
    set({ dbClusterName: dbClusterName, isOpenRestoreDbModal: true }),
  closeRestoreDbModal: () =>
    set({ isOpenRestoreDbModal: false, dbClusterName: '' }),
});
