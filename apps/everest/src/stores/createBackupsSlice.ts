import { StateCreator } from 'zustand';

export interface BackupsSlice {
  isOpenRestoreDbModal: boolean;
  openRestoreDbModal: (dbClusterName: string) => void;
  openRestoreDbModalToNewCluster: (dbClusterName: string) => void;
  closeRestoreDbModal: () => void;
  dbClusterName: string;
  isNewClusterMode: boolean;
}

export const createBackupsSlice: StateCreator<BackupsSlice> = (set) => ({
  isOpenRestoreDbModal: false,
  dbClusterName: '',
  isNewClusterMode: false,
  openRestoreDbModalToNewCluster: (dbClusterName) =>
    set({
      dbClusterName: dbClusterName,
      isOpenRestoreDbModal: true,
      isNewClusterMode: true,
    }),
  openRestoreDbModal: (dbClusterName) =>
    set({
      dbClusterName: dbClusterName,
      isOpenRestoreDbModal: true,
      isNewClusterMode: false,
    }),
  closeRestoreDbModal: () =>
    set({ isOpenRestoreDbModal: false, dbClusterName: '' }),
});
