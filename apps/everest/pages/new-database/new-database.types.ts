import { DbType } from '@percona/ui-lib.db-toggle-card';
import { z } from 'zod';
import { NumberOfNodes, ResourceSize } from './steps/second/second-step.types';
import {
  AmPM,
  TimeValue,
  WeekDays,
} from '../../components/time-selection/time-selection.types';
import { Messages } from './new-database.messages';
import { IP_REGEX } from '../../constants';

export enum DbWizardFormFields {
  dbName = 'dbName',
  dbType = 'dbType',
  k8sNamespace = 'k8sNamespace',
  dbEnvironment = 'dbEnvironment',
  dbVersion = 'dbVersion',
  cpu = 'cpu',
  memory = 'memory',
  disk = 'disk',
  numberOfNodes = 'numberOfNodes',
  resourceSizePerNode = 'resourceSizePerNode',
  backupsEnabled = 'backupsEnabled',
  pitrEnabled = 'pitrEnabled',
  pitrTime = 'pitrTime',
  storageLocation = 'storageLocation',
  timeNumbers = 'timeNumbers',
  selectTime = 'selectTime',
  minute = 'minute',
  minuteHour = 'minuteHour',
  hour = 'hour',
  amPm = 'amPm',
  weekDay = 'weekDay',
  onDay = 'onDay',
  externalAccess = 'externalAccess',
  internetFacing = 'internetFacing',
  sourceRange = 'sourceRange',
  monitoring = 'monitoring',
  endpoint = 'endpoint',
}

// .passthrough tells Zod to not drop unrecognized keys
// this is needed because we parse step by step
// so, by default, Zod would leave behind the keys from previous steps
const stepOneSchema = z
  .object({
    [DbWizardFormFields.dbType]: z.nativeEnum(DbType),
    [DbWizardFormFields.dbName]: z
      .string()
      .max(255, Messages.errors.dbName.tooLong)
      .nonempty(),
    // [DbWizardFormFields.k8sNamespace]: z.string().nonempty(),
    // [DbWizardFormFields.dbEnvironment]: z.string().nonempty(),
    [DbWizardFormFields.dbVersion]: z.string().nonempty(),
  })
  .passthrough();

const stepTwoSchema = z
  .object({
    [DbWizardFormFields.cpu]: z.number(),
    [DbWizardFormFields.memory]: z.number(),
    [DbWizardFormFields.disk]: z.number(),
    [DbWizardFormFields.resourceSizePerNode]: z.nativeEnum(ResourceSize),
    [DbWizardFormFields.numberOfNodes]: z.nativeEnum(NumberOfNodes),
  })
  .passthrough();

const stepThreeSchema = z
  .object({
    backupsEnabled: z.boolean(),
    pitrEnabled: z.boolean(),
    pitrTime: z.string(),
    storageLocation: z.string().nonempty(),
    timeNumbers: z.string(),
    selectTime: z.nativeEnum(TimeValue),
    minuteHour: z.number(),
    minute: z.number(),
    hour: z.number(),
    amPm: z.nativeEnum(AmPM),
    weekDay: z.nativeEnum(WeekDays),
    onDay: z.number(),
  })
  .passthrough();

const stepFourSchema = z
  .object({
    externalAccess: z.boolean(),
    internetFacing: z.boolean(),
    sourceRange: z.string().optional(),
  })
  .passthrough()
  .superRefine((input, ctx) => {
    if (input.externalAccess) {
      if (!input.sourceRange) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 1,
          inclusive: true,
          type: 'string',
          path: ['sourceRange'],
        });
      } else if (IP_REGEX.exec(input.sourceRange) === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'ip',
          path: ['sourceRange'],
          message: Messages.errors.sourceRange.invalid,
        });
      }
    }
  });

const stepFiveSchema = z
  .object({
    monitoring: z.boolean(),
    endpoint: z.string().optional(),
  })
  .passthrough()
  .superRefine((input, ctx) => {
    if (input.monitoring) {
      const { success } = z.string().url().nonempty().safeParse(input.endpoint);

      if (!success) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'url',
          path: ['endpoint'],
          message: Messages.errors.endpoint.invalid,
        });
      }
    }
  });

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
