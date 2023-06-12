import { DbType } from '@percona/ui-lib.db-toggle-card';
import { z } from 'zod';
import { BasicInformationFields } from './steps/first/first-step.types';
import { Messages as FirstStepMessages } from '../new-database/steps/first/first-step.messages';

// .passthrough tells Zod to not drop unrecognized keys
// this is needed because we parse step by step
// so, by default, Zod would leave behind the keys from previous steps
const stepOneSchema = z
  .object({
    [BasicInformationFields.dbType]: z.nativeEnum(DbType),
    [BasicInformationFields.dbName]: z.string().max(255, FirstStepMessages.errors.dbName),
    [BasicInformationFields.k8sNamespace]: z.string(),
    [BasicInformationFields.dbEnvironment]: z.string(),
    [BasicInformationFields.dbVersion]: z.string(),
  })
  .passthrough();

const stepTwoSchema = z
  .object({
    firstName: z.string().optional(),
  })
  .passthrough();

const stepThreeSchema = z
  .object({
    lastName: z.string().optional(),
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
