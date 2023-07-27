import { StorageType } from "../../../../types/backupStorages.types";

export const useBackupStorages = () => ({
  data: [{
    id: 'backup-storage-1',
    name: 'Backup Storage One',
    type: StorageType.S3,
    bucketName: 'bucket-001',
    region: 'Us'
  }]
});
