import { DbWizardFormFields } from '../../new-database.types';
import { ResourceSize } from './second-step.types';

export const DEFAULT_SIZES = {
  [ResourceSize.small]: {
    [DbWizardFormFields.cpu]: 1,
    [DbWizardFormFields.memory]: 2,
    [DbWizardFormFields.disk]: 25,
  },
  [ResourceSize.medium]: {
    [DbWizardFormFields.cpu]: 4,
    [DbWizardFormFields.memory]: 8,
    [DbWizardFormFields.disk]: 100,
  },
  [ResourceSize.large]: {
    [DbWizardFormFields.cpu]: 8,
    [DbWizardFormFields.memory]: 32,
    [DbWizardFormFields.disk]: 200,
  },
};
