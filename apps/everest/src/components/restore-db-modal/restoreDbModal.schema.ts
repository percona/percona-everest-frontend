import { z } from 'zod';

export enum RestoreDbFields {
  backupType = 'backupType',
  backupList = 'backupList',
}

export const schema = z.object({
  [RestoreDbFields.backupType]: z.string(),
  [RestoreDbFields.backupList]: z.string(),
});

export type ScheduleFormData = z.infer<typeof schema>;
