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
import { FirstStep } from './first/first-step';
import { ResourcesStep } from './resources/resources-step.tsx';
import { Backups } from './backups/backups';
import { AdvancedConfigurations } from './advanced-configurations/advanced-configurations';
import { Monitoring } from './monitoring/monitoring';
import PITRStep from './pitr';

// TODO re-add steps after API is ready
export const steps = [
  FirstStep,
  ResourcesStep,
  Backups,
  PITRStep,
  AdvancedConfigurations,
  Monitoring,
];
