import { api } from './api';
import { CreateBackupStoragePayload, GetBackupStoragesPayload } from '../types/backupStorages.types';

export const getBackupStoragesFn = async () => {
  const response = await api.get<GetBackupStoragesPayload>('backup-storages');

  return response.data;
};

export const createBackupStorageFn = async (formData: CreateBackupStoragePayload) => {
  const response = await api.post('backup-storages', formData);

  return response.data;
}
