import { DbType } from "@percona/ui-lib.db-toggle-card"
import { z } from "zod";

export const dbWizardSchema = z.object({
  dbType: z.nativeEnum(DbType),
});

export type DbWizardType = z.infer<typeof dbWizardSchema>;