import { DbType } from "@percona/ui-lib.db-toggle-card"
import { z } from "zod";

// .passthrough tells Zod to not drop unrecognized keys
// this is needed because we parse step by step
// so, by default, Zod would leave behind the keys from previous steps
const stepOneSchema = z.object({
  dbType: z.nativeEnum(DbType)
}).passthrough();

const stepTwoSchema = z.object({
  firstName: z.string().optional()
}).passthrough();

const stepThreeSchema = z.object({
  lastName: z.string().optional()
}).passthrough();

const stepFourSchema = z.object({
  country: z.string().optional()
}).passthrough();

const stepFiveSchema = z.object({
  monitoring: z.boolean(),
  endpoint: z.string().url().optional()
}).passthrough().superRefine((input, ctx) => {
  if (!!input.monitoring) {
    const { success } = z.string().url().nonempty().safeParse(input.endpoint);

    if (!success) {
      ctx.addIssue({
        code: z.ZodIssueCode.invalid_string,
        validation: 'url',
        path: ['endpoint']
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
  .and(stepFiveSchema)

export type DbWizardType = z.infer<typeof superset>;