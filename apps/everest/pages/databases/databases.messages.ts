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
export const Messages = {
  createDatabase: 'Create Database',
  noKubernetesClusters:
    'Oops! It looks like you don’t have any Kubernetes Cluster yet.',
  copyCommand: 'Copy command',
  alertTitle:
    'Run the following command to install all required operators in headless mode:',
  copyToClipboardTooltip: 'Successfully copied',
  noKubernetesCommand:
    '/everestctl install operators --backup.enable=false --everest.endpoint=http://127.0.0.1:8080 --monitoring.enable=false --operator.mongodb=true --operator.postgresql=true --operator.xtradb-cluster=true --skip-wizard -k config.yaml',
};
