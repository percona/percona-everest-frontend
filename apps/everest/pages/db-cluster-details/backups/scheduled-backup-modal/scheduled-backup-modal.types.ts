import z from 'zod';
import {
  AmPM,
  TimeValue,
  WeekDays,
} from '../../../../components/time-selection/time-selection.types';
import { TIME_SELECTION_DEFAULTS } from '../../../database-form/database-form.constants';
import { generateShortUID } from '../../../database-form/steps/first/utils';

export type OnDemandBackupModalProps = {
  open: boolean;
  handleClose: () => void;
};

export enum BackupFields {
  name = 'name',
  storageLocation = 'storageLocation',
  selectedTime = 'selectedTime',
  minute = 'minute',
  hour = 'hour',
  amPm = 'amPm',
  weekDay = 'weekDay',
  onDay = 'onDay',
}

export const defaultValuesFc = () => ({
  [BackupFields.name]: `backup-${generateShortUID()}`,
  [BackupFields.storageLocation]: '',
  ...TIME_SELECTION_DEFAULTS,
});

export const schema = z.object({
  [BackupFields.name]: z.string().nonempty(),
  selectedTime: z.nativeEnum(TimeValue),
  minute: z.number().optional(),
  hour: z.number().optional(),
  amPm: z.nativeEnum(AmPM).optional(),
  weekDay: z.nativeEnum(WeekDays).optional(),
  onDay: z.number().optional(),
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
          message:
            'Invalid option. Please make sure you added a storage location and select it from the dropdown.',
        });
      }
    }),
});

export type ScheduledBackupFormData = z.infer<typeof schema>;
