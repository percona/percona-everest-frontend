import z from 'zod';
import { format } from 'date-fns';
import { FILENAME_TIMESTAMP_FORMAT } from '../../../constants';

export type OnDemandBackupModalProps = {
  open: boolean;
  handleClose: () => void;
};

export enum BackupFields {
  name = 'name',
  storageLocation = 'storageLocation',
}

export const defaultValuesFc = (dbClusterName?: string) => ({
  [BackupFields.name]: dbClusterName
    ? `backup-${dbClusterName}-${format(new Date(), FILENAME_TIMESTAMP_FORMAT)}`
    : '',
  [BackupFields.storageLocation]: '',
});

export const schema = z.object({
  [BackupFields.name]: z.string().nonempty(),
  [BackupFields.storageLocation]: z
    .string()
    .or(
      z.object({
        name: z.string(),
      })
    )
    .nullable()
    .superRefine((input, ctx) => {
      if (!input || typeof input === 'string' || !input.name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid',
        });
      }
    }),
});

export type BackupFormData = z.infer<typeof schema>;
