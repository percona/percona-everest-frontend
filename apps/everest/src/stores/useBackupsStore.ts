import { create } from 'zustand';

interface BackupsStore {
  isOpenRestoreDbModal: boolean;
  openRestoreDbModal: (dbClusterName: string) => void;
  closeRestoreDbModal: () => void;
  dbClusterName: string;
}

export const useBackupsStore = create<BackupsStore>()((set) => ({
  isOpenRestoreDbModal: false,
  dbClusterName: '',
  openRestoreDbModal: (dbClusterName) =>
    set({ dbClusterName: dbClusterName, isOpenRestoreDbModal: true }),
  closeRestoreDbModal: () =>
    set({ isOpenRestoreDbModal: false, dbClusterName: '' }),
}));
