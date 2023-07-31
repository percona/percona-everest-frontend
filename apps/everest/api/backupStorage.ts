import {
  BackupStorage,
  GetBackupStoragesPayload,
} from '../types/backupStorages.types';
import { api } from './api';

export const getBackupStoragesFn = async () => {
  const response = await api.get<GetBackupStoragesPayload>('backup-storages');

  return response.data;
};

export const createBackupStorageFn = async (formData: BackupStorage) => {
  const response = await api.post('backup-storages', formData);

  return response.data;
};
