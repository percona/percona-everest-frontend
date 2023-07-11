import { DbWizardType } from "../../new-database.types";

export type SectionProps = {
  active?: boolean;
  hasBeenReached?: boolean;
  onSectionEdit: (order: number) => void;
} & DbWizardType;
