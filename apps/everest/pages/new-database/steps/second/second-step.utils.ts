import {
  NumberOfNodes,
  ResourcesFields,
  ResourceSize,
} from './second-step.types';
import { UseFormSetValue, FieldValues } from 'react-hook-form';

const humanizedNumberOfNodesMap: Record<NumberOfNodes, string> = {
  [NumberOfNodes.oneNode]: 'Standalone',
  [NumberOfNodes.twoNodes]: 'Source Replica',
  [NumberOfNodes.threeNodes]: 'Source Replica Replica',
};

export const humanizeNumberOfNodesMap = (type: NumberOfNodes): string =>
  humanizedNumberOfNodesMap[type];

export interface DBClusterDefaultResources {
  [key: string]: {
    [ResourcesFields.memory]: number;
    [ResourcesFields.cpu]: number;
    [ResourcesFields.disk]: number;
  };
}

export const DEFAULT_SIZES: DBClusterDefaultResources = {
  [ResourceSize.small]: {
    memory: 2,
    cpu: 1,
    disk: 25,
  },
  [ResourceSize.medium]: {
    memory: 8,
    cpu: 4,
    disk: 100,
  },
  [ResourceSize.large]: {
    memory: 32,
    cpu: 8,
    disk: 500,
  },
};

export const isCustom = (
  typeOfField:
    | ResourcesFields.cpu
    | ResourcesFields.disk
    | ResourcesFields.memory,
  value: number,
  currentLabel: ResourceSize
) => {
  debugger;
  console.log(DEFAULT_SIZES[currentLabel][typeOfField] === value);
  return currentLabel !== ResourceSize.custom
    ? !(DEFAULT_SIZES[currentLabel][typeOfField] === value)
    : undefined;
};

export const checkSwitchToCustom = (
  fieldName:
    | ResourcesFields.disk
    | ResourcesFields.cpu
    | ResourcesFields.memory,
  value: number,
  resourceSizePerNode: ResourceSize,
  setValue: UseFormSetValue<FieldValues>
) => {
  if (
    resourceSizePerNode !== ResourceSize.custom &&
    isCustom(fieldName, value, resourceSizePerNode)
  ) {
    setValue(ResourcesFields.resourceSizePerNode, ResourceSize.custom);
  }
};
