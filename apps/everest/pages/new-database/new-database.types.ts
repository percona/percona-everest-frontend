import { DbType } from "@percona/ui-lib.db-toggle-card"
import { z } from "zod";

const stepOneSchema = z.object({
  dbType: z.nativeEnum(DbType)
});
// const stepTwoSchema = z.object({
//   firstName:  z.string()
// });
// const stepThreeSchema = z.object({
//   lastName:  z.string()
// });
const stepFourSchema = z.object({
  externalAccess: z.boolean(),
  internetFacing: z.boolean(),
  sourceRange: z.string().ip(),
});
// const stepFiveSchema = z.object({
//   address: z.string(),
// });

// Each position of the array is the validation schema for a given step. Add more after.
export const dbWizardSchema = [
  stepOneSchema,
  // stepTwoSchema,
  // stepThreeSchema,
  stepFourSchema,
  // stepFiveSchema,
];

// Uncomment below
const superset = stepOneSchema
  // .and(stepTwoSchema)
  // .and(stepThreeSchema)
  .and(stepFourSchema)
  // .and(stepFiveSchema)

export type DbWizardType = z.infer<typeof superset>;
