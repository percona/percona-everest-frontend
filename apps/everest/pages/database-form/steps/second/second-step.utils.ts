// percona-everest-frontend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { UseFormSetValue, FieldValues } from 'react-hook-form';
import { ResourceSize } from './second-step.types';
import { DEFAULT_SIZES } from './second-step.const';
import { DbWizardFormFields } from '../../database-form.types';
import { DbCluster } from '../../../../types/dbCluster.types';

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
    | DbWizardFormFields.cpu
    | DbWizardFormFields.disk
    | DbWizardFormFields.memory,
  value: number,
  currentLabel: ResourceSize
) => {
  return currentLabel !== ResourceSize.custom
    ? !(DEFAULT_SIZES[currentLabel][typeOfField] === value)
    : undefined;
};

export const checkSwitchToCustom = (
  fieldName:
    | DbWizardFormFields.disk
    | DbWizardFormFields.cpu
    | DbWizardFormFields.memory,
  value: number,
  resourceSizePerNode: ResourceSize,
  setValue: UseFormSetValue<FieldValues>
) => {
  if (
    resourceSizePerNode !== ResourceSize.custom &&
    isCustom(fieldName, value, resourceSizePerNode)
  ) {
    setValue(DbWizardFormFields.resourceSizePerNode, ResourceSize.custom);
  }
};

export const getResourceNames = (names: string[]): string => {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  if (names.length === 3) return `${names[0]}, ${names[1]}, and ${names[2]}`;
  return '';
};

export const removeMeasurementValue = (value: string) =>
  value ? +value?.slice(0, -1) : 0;

export const matchFieldsValueToResourceSize = (
  dbCluster: DbCluster
): ResourceSize => {
  const resources = dbCluster?.spec?.engine?.resources;
  const size = +removeMeasurementValue(
    dbCluster?.spec?.engine?.storage?.size.toString()
  );
  const memory = +removeMeasurementValue(resources?.memory.toString());

  const res = Object.values(DEFAULT_SIZES).findIndex(
    (item) =>
      item.cpu === +resources?.cpu &&
      item.memory === memory &&
      item.disk === size
  );
  return res !== -1
    ? (Object.keys(DEFAULT_SIZES)[res] as ResourceSize)
    : ResourceSize.custom;
};
