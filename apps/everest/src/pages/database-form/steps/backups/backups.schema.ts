import { z } from 'zod';
import { ScheduleFormFields } from '../../../../components/schedule-form/schedule-form.types.ts';
import { rfc_123_schema } from '../../../../utils/common-validation.ts';
import { Messages as ScheduleFormMessages } from '../../../../components/schedule-form/schedule-form.messages.ts';
import { MAX_SCHEDULE_NAME_LENGTH } from '../../../../consts.ts';
import { timeSelectionSchemaObject } from '../../../../components/time-selection/time-selection.schema.ts';
import { storageLocationScheduleFormSchema } from '../../../../components/schedule-form/schedule-form.schema.ts';
import { DbWizardFormFields } from '../../database-form.types.ts';
import { Messages } from '../../database-form.messages.ts';

const backupsValidationObject = {
  backupsEnabled: z.boolean(),
  // pitrEnabled: z.boolean(),
  // pitrTime: z.string(),
};

const backupsWithScheduleValidationObject = {
  ...backupsValidationObject,
  [ScheduleFormFields.scheduleName]: rfc_123_schema(
    `${ScheduleFormMessages.scheduleName.label.toLowerCase()} name`,
    MAX_SCHEDULE_NAME_LENGTH
  )
    .max(MAX_SCHEDULE_NAME_LENGTH, ScheduleFormMessages.scheduleName.tooLong)
    .optional(),
  ...timeSelectionSchemaObject,
  ...storageLocationScheduleFormSchema,
};

export const backupsValidationSchema = z
  .object(backupsValidationObject)
  .passthrough()
  .superRefine(({ backupsEnabled, storageLocation }, ctx) => {
    if (backupsEnabled && !storageLocation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [DbWizardFormFields.storageLocation],
        message: Messages.errors.storageLocation.invalid,
      });
    }
  });

export const backupsWithScheduleValidationSchema = z
  .object(backupsWithScheduleValidationObject)
  .passthrough()
  .superRefine(({ backupsEnabled, storageLocation }, ctx) => {
    if (backupsEnabled && !storageLocation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: [DbWizardFormFields.storageLocation],
        message: Messages.errors.storageLocation.invalid,
      });
    }
  });

export type BackupsValidationSchemaType = z.infer<
  typeof backupsValidationSchema
>;
export type BackupsWithScheduleValidationSchemaType = z.infer<
  typeof backupsWithScheduleValidationSchema
>;
