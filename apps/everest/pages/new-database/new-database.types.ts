import { DbType } from "@percona/ui-lib.db-toggle-card";
import { z } from "zod";
import { IP_REGEX } from "./new-database.constants";
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
        });
      }
    }
  });

const stepFiveSchema = z
  .object({
    monitoring: z.boolean(),
    endpoint: z.string().url().optional(),
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
