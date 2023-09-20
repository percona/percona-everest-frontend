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
    "Oops! It looks like you don't have any Kubernetes clusters yet. Let’s create one:",
  copyCommand: 'Copy command',
  alertTitle:
    'Run the following command to install all required operators in headless mode:',
  copyToClipboardTooltip: 'Successfully copied',
  noKubernetesCommand:
    'sh KUBECONFIG=~/.kube/config; ./everestctl install operators',
  firstLine1: 'Download the latest release of the ',
  firstLineLink: 'everestctl',
  firstLine2: ' command to provision Percona Everest.',
  secondLine:
    'Rename the downloaded file using the following command and replacing the placeholder `everestctl-darwin-amd64` to match the file downloaded in the previous step: `mv everestctl-darwin-amd64 everestctl`.',
  thirdLine: 'Modify the file permissions: `chmod +x everestctl`.',
  forthLine:
    'From the installation wizard, provision and register the Kubernetes cluster in Everest using the following command.',
  caption:
    'Note that Everest will search for the kubeconfig file in the `~/.kube/config` path. If your file is located elsewhere, add the `KUBECONFIG` environment variable before running the command',
};
