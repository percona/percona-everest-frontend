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
