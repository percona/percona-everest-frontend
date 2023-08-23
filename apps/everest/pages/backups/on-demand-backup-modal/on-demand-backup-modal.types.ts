import z from 'zod';

export type OnDemandBackupModalProps = {
  open: boolean;
  handleClose: () => void;
};

export enum BackupFields {
  name = 'name',
  storageLocation = 'storageLocation',
}

export const defaultValues = {
  [BackupFields.name]: '',
  [BackupFields.storageLocation]: '',
};

export const schema = z.object({
  [BackupFields.name]: z.string().nonempty(),
  [BackupFields.storageLocation]: z
    .string()
    .or(
      z.object({
        name: z.string(),
      })
    )
    .nullable(),
});

export type BackupFormData = z.infer<typeof schema>;
