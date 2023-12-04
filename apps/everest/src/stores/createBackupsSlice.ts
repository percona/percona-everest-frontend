import { StateCreator } from 'zustand';

export interface BackupsSlice {
  isOpenRestoreDbModal: boolean;
  openRestoreDbModal: (dbClusterName: string) => void;
  openRestoreDbModalToNewCluster: (dbClusterName: string) => void;
  closeRestoreDbModal: () => void;
  dbClusterName: string;
  mode: 'sameCluster' | 'newCluster';
}

export const createBackupsSlice: StateCreator<BackupsSlice> = (set) => ({
  isOpenRestoreDbModal: false,
  dbClusterName: '',
  mode: 'sameCluster',
  openRestoreDbModalToNewCluster: (dbClusterName) =>
    set({
      dbClusterName: dbClusterName,
      isOpenRestoreDbModal: true,
      mode: 'newCluster',
    }),
  openRestoreDbModal: (dbClusterName) =>
    set({
      dbClusterName: dbClusterName,
      isOpenRestoreDbModal: true,
      mode: 'sameCluster',
    }),
  closeRestoreDbModal: () =>
    set({ isOpenRestoreDbModal: false, dbClusterName: '' }),
});
