import { z } from 'zod';
import { DbType } from '@percona/types';
import { IP_REGEX, MAX_DB_CLUSTER_NAME_LENGTH } from '../../consts.ts';
import { Messages } from './database-form.messages.ts';
import { ResourceSize } from './steps/second/second-step.types.ts';
import { DbWizardFormFields } from './database-form.types.ts';
import { rfc_123_schema } from 'utils/common-validation.ts';
import {
  backupsValidationSchema,
  BackupsValidationSchemaType,
  backupsWithScheduleValidationSchema,
  BackupsWithScheduleValidationSchemaType,
} from './steps/backups/backups-schema.ts';

const resourceToNumber = (minimum = 0) =>
  z.union([z.string().nonempty(), z.number()]).pipe(
    z.coerce
      .number({
        invalid_type_error: 'Please insert a valid number',
      })
      .min(minimum)
  );

const stepOneSchema = z
  .object({
    [DbWizardFormFields.dbType]: z.nativeEnum(DbType),
    [DbWizardFormFields.dbName]: rfc_123_schema('database name')
      .max(MAX_DB_CLUSTER_NAME_LENGTH, Messages.errors.dbName.tooLong)
      .nonempty(),
    // [DbWizardFormFields.k8sNamespace]: z.string().nonempty(),
    // [DbWizardFormFields.dbEnvironment]: z.string().nonempty(),
    [DbWizardFormFields.dbVersion]: z.string().nonempty(),
    [DbWizardFormFields.storageClass]: z
      .string()
      .nullable()
      .superRefine((input, ctx) => {
        if (!input) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: Messages.errors.storageClass.invalid,
          });
        }
      }),
  })
  .passthrough();

// .passthrough tells Zod to not drop unrecognized keys
// this is needed because we parse step by step
// so, by default, Zod would leave behind the keys from previous steps

const stepTwoSchema = z
  .object({
    [DbWizardFormFields.cpu]: resourceToNumber(0.6),
    [DbWizardFormFields.memory]: resourceToNumber(0.512),
    [DbWizardFormFields.disk]: resourceToNumber(1),
    [DbWizardFormFields.resourceSizePerNode]: z.nativeEnum(ResourceSize),
    [DbWizardFormFields.numberOfNodes]: z.string(),
  })
  .passthrough();

const backupsStepSchema = (hideScheduleValidation: boolean) => {
  return !hideScheduleValidation
    ? backupsWithScheduleValidationSchema
    : backupsValidationSchema;
};

const advancedConfigurationsSchema = z
  .object({
    [DbWizardFormFields.externalAccess]: z.boolean(),
    // internetFacing: z.boolean(),
    [DbWizardFormFields.sourceRanges]: z.array(
      z.object({ sourceRange: z.string().optional() })
    ),
    [DbWizardFormFields.engineParametersEnabled]: z.boolean(),
    [DbWizardFormFields.engineParameters]: z.string().optional(),
  })
  .passthrough()
  .superRefine(({ sourceRanges }, ctx) => {
    sourceRanges.forEach(({ sourceRange }, index) => {
      if (sourceRange && IP_REGEX.exec(sourceRange) === null) {
        ctx.addIssue({
          code: z.ZodIssueCode.invalid_string,
          validation: 'ip',
          path: [DbWizardFormFields.sourceRanges, index, 'sourceRange'],
          message: Messages.errors.sourceRange.invalid,
        });
      }
    });
  });

const stepFiveSchema = z
  .object({
    monitoring: z.boolean(),
    monitoringInstance: z.string().nullable(),
  })
  .passthrough();

// Each position of the array is the validation schema for a given step
export const getDBWizardSchema = (
  activeStep: number,
  hideBackupValidation: boolean
) => {
  const schema = [
    stepOneSchema,
    stepTwoSchema,
    backupsStepSchema(hideBackupValidation),
    advancedConfigurationsSchema,
    stepFiveSchema,
  ];
  return schema[activeStep];
};

export type StepOneType = z.infer<typeof stepOneSchema>;
export type StepTwoType = z.infer<typeof stepTwoSchema>;
export type AdvancedConfigurationType = z.infer<
  typeof advancedConfigurationsSchema
>;
export type BackupStepType = BackupsValidationSchemaType &
  BackupsWithScheduleValidationSchemaType;
export type StepFiveType = z.infer<typeof stepFiveSchema>;

export type DbWizardType = StepOneType &
  StepTwoType &
  StepFiveType &
  AdvancedConfigurationType &
  BackupStepType;