import { DbWizardType } from "../../new-database.types";

export type SectionProps = {
  active?: boolean;
  hasBeenReached?: boolean;
} & DbWizardType;
