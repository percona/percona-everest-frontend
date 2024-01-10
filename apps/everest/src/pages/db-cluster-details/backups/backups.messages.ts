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
  // TODO Temporary message. Should be deleted after active/inactive status for each schedule
  backupsDisabled:
    'Backups are currently disabled for this database. To set up backup schedules, first re-enable backups in the database configuration.',
  backupsDisabledPG:
    'Scheduled backups are currently unavailable for PostgreSQL databases. You can still enable on-demand backups from this page.',
  noStoragesMessage:
    'To start using Backups, you need to add a backups storage first.',
  addStorage: 'Add Storage',
};
