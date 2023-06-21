import { ResourcesFields, ResourceSize } from './second-step.types';

export const DEFAULT_SIZES = {
  [ResourceSize.small]: {
    [ResourcesFields.cpu]: 1,
    [ResourcesFields.memory]: 2,
    [ResourcesFields.disk]: 25,
  },
  [ResourceSize.medium]: {
    [ResourcesFields.cpu]: 4,
    [ResourcesFields.memory]: 8,
    [ResourcesFields.disk]: 100,
  },
  [ResourceSize.large]: {
    [ResourcesFields.cpu]: 8,
    [ResourcesFields.memory]: 32,
    [ResourcesFields.disk]: 500,
  },
};
