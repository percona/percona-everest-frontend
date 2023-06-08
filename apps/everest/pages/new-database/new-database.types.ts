import { DbType } from "@percona/ui-lib.db-toggle-card"

export type DbWizardInputs = {
  dbType: DbType;
  externalAccess: boolean;
  internetFacing: boolean;
  sourceRange: string;
}