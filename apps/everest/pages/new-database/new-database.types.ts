import { DbType } from "@percona/ui-lib.db-toggle-card";
import { z } from "zod";
import { IP_REGEX } from "./new-database.constants";

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
  externalAccess: z.boolean(),
  internetFacing: z.boolean(),
  sourceRange: z.string().optional(),
}).passthrough().superRefine((input, ctx) => {
  if (!!input.externalAccess) {
    if (!input.sourceRange) {
      console.log('empty');
      ctx.addIssue({
        code: z.ZodIssueCode.too_small,
        minimum: 1,
        inclusive: true,
        type: 'string',
        message: 'EMPTY',
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

const stepFiveSchema = z.object({
  address: z.string().optional()
}).passthrough();

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
