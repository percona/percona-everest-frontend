import {
  BackupStorageType,
  GetBackupStoragesPayload,
} from '../pages/settings/storage-locations/storage-locations.types';
import { api } from './api';

export const getBackupStoragesFn = async () => {
  const response = await api.get<GetBackupStoragesPayload>('backup-storages');

  return response.data;
};

export const createBackupStorageFn = async (formData: BackupStorageType) => {
  const response = await api.post('backup-storages', formData);

  return response.data;
};

export const editBackupStorageFn = async (formData: BackupStorageType) => {
  const response = await api.patch(`backup-storages/${formData.id}`, formData);

  return response.data;
};

export const deleteBackupStorageFn = async (backupStorageId: string) => {
  const response = await api.delete(`backup-storages/${backupStorageId}`);

  return response.data;
};
