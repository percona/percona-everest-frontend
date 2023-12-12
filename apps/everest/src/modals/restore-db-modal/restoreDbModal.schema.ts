import { z } from 'zod';

export enum RestoreDbFields {
  backupType = 'backupType',
  backupName = 'backupName',
  pitrBackup = 'pitrBackup',
}

export enum BackuptypeValues {
  fromBackup = 'fromBackup',
  fromPitr = 'fromPITR',
}

export const schema = z.object({
  [RestoreDbFields.backupType]: z.nativeEnum(BackuptypeValues),
  [RestoreDbFields.backupName]: z.string().min(1),
});

export const defaultValues = {
  [RestoreDbFields.backupType]: BackuptypeValues.fromBackup,
  [RestoreDbFields.backupName]: '',
  [RestoreDbFields.pitrBackup]: '',
};

export type RestoreDbFormData = z.infer<typeof schema>;
