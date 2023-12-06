import { z } from 'zod';

export enum RestoreDbFields {
  backupType = 'backupType',
  backupList = 'backupList',
}

export enum BackuptypeValues {
  fromBackup = 'fromBackup',
  fromPitr = 'fromPITR',
}

export const schema = z.object({
  [RestoreDbFields.backupType]: z.nativeEnum(BackuptypeValues),
  [RestoreDbFields.backupList]: z.string().min(1),
});

export const defaultValues = {
  [RestoreDbFields.backupType]: BackuptypeValues.fromBackup,
  [RestoreDbFields.backupList]: '',
};

export type RestoreDbFormData = z.infer<typeof schema>;
