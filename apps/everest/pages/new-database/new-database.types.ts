import { DbType } from '@percona/ui-lib.db-toggle-card';
import { z } from 'zod';

// .passthrough tells Zod to not drop unrecognized keys
// this is needed because we parse step by step
// so, by default, Zod would leave behind the keys from previous steps
const stepOneSchema = z
  .object({
    dbType: z.nativeEnum(DbType),
  })
  .passthrough();

const stepTwoSchema = z
  .object({
    firstName: z.string().optional(),
  })
  .passthrough();

const stepThreeSchema = z
  .object({
    backupsEnabled: z.boolean(),
    pitrEnabled: z.boolean(),
    pitrTime: z.string(),
    storageLocation: z.string(),
    timeNumbers: z.string(),
    selectTime: z.string(),
    minuteHour: z.number(),
    minute: z.number(),
    hour: z.number(),
    amPm: z.string(),
    weekDay: z.string(),
    onDay: z.number(),
  })
  .passthrough();

const stepFourSchema = z
  .object({
    country: z.string().optional(),
  })
  .passthrough();

const stepFiveSchema = z
  .object({
    address: z.string().optional(),
  })
  .passthrough();

// Each position of the array is the validation schema for a given step
export const dbWizardSchema = [
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  stepFourSchema,
  stepFiveSchema,
];

const superset = stepOneSchema
  .and(stepTwoSchema)
  .and(stepThreeSchema)
  .and(stepFourSchema)
  .and(stepFiveSchema);

export type DbWizardType = z.infer<typeof superset>;
