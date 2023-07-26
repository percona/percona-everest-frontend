export enum StorageType {
  S3 = 's3',
  AZURE = 'azure',
  GCS = 'gcs',
}

export type BaseBackupStorageFields = {
  name: string;
  type: StorageType;
  bucketName: string;
  region: string;
  url?: string;
}

export type BackupStorage = BaseBackupStorageFields & {
  id: string;
}

export type GetBackupStoragesPayload = BackupStorage[];

export type CreateBackupStoragePayload = BaseBackupStorageFields & {
  accessKey: string;
  secretKey: string;
}