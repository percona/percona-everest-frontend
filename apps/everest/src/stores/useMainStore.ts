import { create } from 'zustand';
import { BackupsSlice, createBackupsSlice } from './createBackupsSlice';

export const useMainStore = create<BackupsSlice>()((...a) => ({
  ...createBackupsSlice(...a),
}));
