import { useMutation, useQuery, UseMutationOptions } from "react-query"
import { createBackupStorageFn, getBackupStoragesFn } from "../../api/backupStorage"
import { BackupStorage, GetBackupStoragesPayload } from "../../types/backupStorages.types"

export const useBackupStorages = () => {
  return useQuery<GetBackupStoragesPayload, unknown, BackupStorage[]>('backupStorages', () => getBackupStoragesFn())
}

export const useCreateBackupStorage = (
  options?: UseMutationOptions<any, unknown, BackupStorage, unknown>
) => {
  return useMutation(
    (payload: BackupStorage) => createBackupStorageFn(payload),
    {...options}
  ); 
}
