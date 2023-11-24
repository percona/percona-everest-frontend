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
  sectionHeader: (schedulesNumber: number) =>
    `${schedulesNumber} ${schedulesNumber > 1 ? 'schedules' : 'schedule'}`,
  noSchedules: 'No schedules',
  // TODO Temporary message. Should be deleted after active/inactive status for each schedule
  backupsDisabled:
    'Backups are disabled for this database. To manage database schedules, first activate backups in the database configuration.',
  menuItems: {
    edit: 'Edit',
    delete: 'Delete',
  },
  deleteModal: {
    header: 'Delete schedule',
    content: 'Are you sure you want to permanently delete this schedule?',
  },
};
