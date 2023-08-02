import { useMutation, UseMutationOptions, useQuery } from 'react-query';
import {
  createBackupStorageFn,
  deleteBackupStorageFn,
  editBackupStorageFn,
  getBackupStoragesFn,
} from '../../api/backupStorage';
import {
  BackupStorage,
  GetBackupStoragesPayload,
} from '../../types/backupStorages.types';

export const BACKUP_STORAGES_QUERY_KEY = 'backupStorages';

export const useBackupStorages = () => {
  return useQuery<GetBackupStoragesPayload, unknown, BackupStorage[]>(
    BACKUP_STORAGES_QUERY_KEY,
    () => getBackupStoragesFn()
  );
};

export const useCreateBackupStorage = (
  options?: UseMutationOptions<any, unknown, BackupStorage, unknown>
) => {
  return useMutation(
    (payload: BackupStorage) => createBackupStorageFn(payload),
    { ...options }
  );
};

export const useEditBackupStorage = (
  options?: UseMutationOptions<any, unknown, BackupStorage, unknown>
) => {
  return useMutation((payload: BackupStorage) => editBackupStorageFn(payload), {
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
