import { z } from 'zod';

export enum StorageLocationsFields {
  name = 'name',
  type = 'type',
  bucketName = 'bucketName',
  description = 'description',
  endpoint = 'endpoint',
  accessKey = 'accessKey',
  secretKey = 'secretKey',
}

export enum StorageLocationTypes {
  s3 = 's3',
  azure = 'azure',
  gcs = 'gcs',
}

export const storageLocationsSchema = z
  .object({
    [StorageLocationsFields.name]: z.string().min(1, 'Name is required'),
    [StorageLocationsFields.type]: z.nativeEnum(StorageLocationTypes),
    [StorageLocationsFields.bucketName]: z
      .string()
      .min(1, 'Bucket name is required'),
    [StorageLocationsFields.description]: z.string().optional(),
    [StorageLocationsFields.endpoint]: z
      .string()
      .min(1, 'Endpoint is required'),
    [StorageLocationsFields.accessKey]: z
      .string()
      .min(1, 'Access key is required'),
    [StorageLocationsFields.secretKey]: z
      .string()
      .min(1, 'Secret key is required'),
  })
  .passthrough();

export type StorageLocationType = z.infer<typeof storageLocationsSchema>;
