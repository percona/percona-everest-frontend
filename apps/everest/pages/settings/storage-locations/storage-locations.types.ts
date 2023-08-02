import { z } from 'zod';

export enum StorageLocationsFields {
  name = 'name',
  type = 'type',
  bucketName = 'bucketName',
  description = 'description',
  region = 'region',
  url = 'url',
  accessKey = 'accessKey',
  secretKey = 'secretKey',
}

export enum StorageType {
  S3 = 's3',
  AZURE = 'azure',
  GCS = 'gcs',
}

export const storageLocationDefaultValues = {
  [StorageLocationsFields.name]: '',
  [StorageLocationsFields.type]: StorageType.S3,
  [StorageLocationsFields.url]: '',
  [StorageLocationsFields.description]: '',
  [StorageLocationsFields.region]: '',
  [StorageLocationsFields.accessKey]: '',
  [StorageLocationsFields.secretKey]: '',
  [StorageLocationsFields.bucketName]: '',
};

export const storageLocationEditValues = (
  selectedStorageLocationForEdit: BackupStorageType
) => ({
  [StorageLocationsFields.name]: selectedStorageLocationForEdit.name,
  [StorageLocationsFields.type]: StorageType.S3,
  [StorageLocationsFields.url]: selectedStorageLocationForEdit.url,
  [StorageLocationsFields.description]:
    selectedStorageLocationForEdit.description,
  [StorageLocationsFields.region]: selectedStorageLocationForEdit.region,
  [StorageLocationsFields.accessKey]: selectedStorageLocationForEdit.accessKey,
  [StorageLocationsFields.secretKey]: selectedStorageLocationForEdit.secretKey,
  [StorageLocationsFields.bucketName]:
    selectedStorageLocationForEdit.bucketName,
});

export const storageLocationsSchema = z
  .object({
    [StorageLocationsFields.name]: z.string().nonempty(),
    [StorageLocationsFields.type]: z.nativeEnum(StorageType),
    [StorageLocationsFields.bucketName]: z.string().nonempty(),
    [StorageLocationsFields.description]: z.string().optional(),
    [StorageLocationsFields.url]: z.string().nonempty().url(),
    [StorageLocationsFields.region]: z.string().nonempty(),
    [StorageLocationsFields.accessKey]: z.string().nonempty(),
    [StorageLocationsFields.secretKey]: z.string().nonempty(),
  })
  .passthrough();

export type BackupStorageType = z.infer<typeof storageLocationsSchema> & {
  id?: string;
};
