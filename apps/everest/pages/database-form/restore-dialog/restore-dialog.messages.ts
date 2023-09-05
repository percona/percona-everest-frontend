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
  title: 'One last thing',
  content:
    'Ensure that you’re using the same secret as the selected backup by running this command:',
  reject: 'Cancel',
  accept: 'Done',
  alert: (backupDb: string, restoreDb: string) =>
    `BACKUPDB=${backupDb}; RESTOREDB=${restoreDb}; kubectl get secret "everest-secrets-$BACKUPDB" -n everest-operator-system -o yaml | sed "s/name: everest-secrets-$BACKUPDB/name: everest-secrets-$RESTOREDB/" | kubectl apply -f -`,
  copyToClipboardTooltip: 'Successfully copied',
  copy: 'Copy',
};
