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
  noKubernetesClusters:
    "Oops! It looks like you don't have any Kubernetes clusters yet.",
  letsCreate: 'Let’s create one:',
  noKubernetesCommand: 'KUBECONFIG=~/.kube/config',
  downloadTheLatest: 'Download the latest release of the ',
  everestctl: 'everestctl',
  toProvisionPercona: ' to provision Percona Everest.',
  renameTheFile:
    'Rename the downloaded file using the following command and replacing the placeholder ',
  toMatchTheFile: ' to match the file downloaded in the previous step:',
  moveCommand: 'mv everestctl-darwin-amd64 everestctl',
  modifyPermissions: 'Modify the file permissions:',
  modifyPermissionsCommand: 'chmod +x everestctl',
  fromTheInstallationWizard:
    'From the installation wizard, provision and register the Kubernetes cluster in Everest using the following command.',
  everestWillSearch: 'Everest will search for the kubeconfig file in the ',
  ifYourFileIsLocated: ' path. If your file is located elsewhere, add the  ',
  beforeRunningTheCommand: ' environment variable before running the command:',
  everestctlInstall: './everestctl install operators',
  recheck: 'Recheck',
  note: 'Note:',
  makeSure:
    "Make sure to fill in database monitoring details in this provisioning step, as you won't be able to enable it from the UI later.",
  usingPMMServerInstanceCase:
    'If you are using a PMM server instance with a self-signed certificate you cannot use HTTPS in the PMM URL endpoint.',
};