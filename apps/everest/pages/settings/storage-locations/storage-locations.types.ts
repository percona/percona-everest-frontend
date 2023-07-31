import { z } from 'zod';
import { StorageType } from '../../../types/backupStorages.types';

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

export const storageLocationsSchema = z
  .object({
    [StorageLocationsFields.name]: z.string().nonempty(),
    [StorageLocationsFields.type]: z.nativeEnum(StorageType),
    [StorageLocationsFields.bucketName]: z.string().nonempty(),
    [StorageLocationsFields.description]: z.string().optional(),
    [StorageLocationsFields.url]: z.string().nonempty(),
    [StorageLocationsFields.accessKey]: z.string().nonempty(),
    [StorageLocationsFields.secretKey]: z.string().nonempty(),
  })
  .passthrough();

export type StorageLocationType = z.infer<typeof storageLocationsSchema>;
