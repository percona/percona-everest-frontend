import { DbType } from "@percona/ui-lib.db-toggle-card"
import { z } from "zod";

export const dbWizardSchema = z.object({
  dbType: z.nativeEnum(DbType),
  externalAccess: z.boolean(),
  internetFacing: z.boolean(),
  sourceRange: z.string().ip(),
});

export type DbWizardType = z.infer<typeof dbWizardSchema>;
