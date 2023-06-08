import { DbType } from "@percona/ui-lib.db-toggle-card"
import { z } from "zod";

const stepOneSchema = z.object({
  dbType: z.string()
});

const stepTwoSchema = z.object({
  firstName: z.string().optional()
})

const stepThreeSchema = z.object({
  lastName: z.string().optional()
});

const stepFourSchema = z.object({
  externalAccess: z.boolean(),
  internetFacing: z.boolean(),
  sourceRange: z.string().ip(),
});

const stepFiveSchema = z.object({
  address: z.string().optional()
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
