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

import { ScheduleFormFields } from 'components/schedule-form/schedule-form.types.ts';

export enum DbWizardForm {
  dbName = 'dbName',
  dbType = 'dbType',
  k8sNamespace = 'k8sNamespace',
  dbEnvironment = 'dbEnvironment',
  dbVersion = 'dbVersion',
  storageClass = 'storageClass',
  cpu = 'cpu',
  memory = 'memory',
  disk = 'disk',
  numberOfNodes = 'numberOfNodes',
  resourceSizePerNode = 'resourceSizePerNode',
  backupsEnabled = 'backupsEnabled',
  pitrEnabled = 'pitrEnabled',
  pitrStorageLocation = 'pitrStorageLocation',
  externalAccess = 'externalAccess',
  internetFacing = 'internetFacing',
  sourceRanges = 'sourceRanges',
  engineParametersEnabled = 'engineParametersEnabled',
  engineParameters = 'engineParameters',
  monitoring = 'monitoring',
  monitoringInstance = 'monitoringInstance',
  endpoint = 'endpoint',
}

export const DbWizardFormFields = {
  ...DbWizardForm,
  ...ScheduleFormFields,
};

export type DbWizardMode = 'edit' | 'new' | 'restoreFromBackup';

export type StepProps = {
  loadingDefaultsForEdition: boolean;
};
