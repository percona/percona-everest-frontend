import {
  NumberOfNodes,
  ResourcesFields,
  ResourceSize,
} from './second-step.types';
import { UseFormSetValue, FieldValues } from 'react-hook-form';
import { DEFAULT_SIZES } from './second-step.const';

const humanizedNumberOfNodesMap: Record<NumberOfNodes, string> = {
  [NumberOfNodes.oneNode]: 'Standalone',
  [NumberOfNodes.twoNodes]: 'Source Replica',
  [NumberOfNodes.threeNodes]: 'Source Replica Replica',
};

export const humanizeNumberOfNodesMap = (type: NumberOfNodes): string =>
  humanizedNumberOfNodesMap[type];

const humanizedResourceSizeMap: Record<ResourceSize, string> = {
  [ResourceSize.small]: 'Small',
  [ResourceSize.medium]: 'Medium',
  [ResourceSize.large]: 'Large',
  [ResourceSize.custom]: 'Custom',
};

export const humanizeResourceSizeMap = (type: ResourceSize): string =>
  humanizedResourceSizeMap[type];

export const isCustom = (
  typeOfField:
    | ResourcesFields.cpu
    | ResourcesFields.disk
    | ResourcesFields.memory,
  value: number,
  currentLabel: ResourceSize
) => {
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

export const getResourceNames = (names: string[]): string => {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  if (names.length === 3) return `${names[0]}, ${names[1]}, and ${names[2]}`;
};
