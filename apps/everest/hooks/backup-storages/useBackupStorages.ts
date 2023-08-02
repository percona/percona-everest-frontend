import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import {
  createBackupStorageFn,
  deleteBackupStorageFn,
  editBackupStorageFn,
  getBackupStoragesFn,
} from '../../api/backupStorage';
import { BackupStorageType, GetBackupStoragesPayload } from '../../pages/settings/storage-locations/storage-locations.types';

export const BACKUP_STORAGES_QUERY_KEY = 'backupStorages';

export const useBackupStorages = () => {
  return useQuery<GetBackupStoragesPayload, unknown, BackupStorageType[]>(
    BACKUP_STORAGES_QUERY_KEY,
    () => getBackupStoragesFn()
  );
};

export const useCreateBackupStorage = (
  options?: UseMutationOptions<any, unknown, BackupStorageType, unknown>
) => {
  return useMutation(
    (payload: BackupStorageType) => createBackupStorageFn(payload),
    { ...options }
  );
};

export const useEditBackupStorage = (
  options?: UseMutationOptions<any, unknown, BackupStorageType, unknown>
) => {
  return useMutation((payload: BackupStorageType) => editBackupStorageFn(payload), {
    ...options,
  });
};

export const useDeleteBackupStorage = (
  options?: UseMutationOptions<any, unknown, string, unknown>
) => {
  return useMutation((payload: string) => deleteBackupStorageFn(payload), {
    ...options,
  });
};
