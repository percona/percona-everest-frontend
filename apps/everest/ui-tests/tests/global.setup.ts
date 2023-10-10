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

import { test as setup } from '@playwright/test';

setup('Backup storage', async ({ request }) => {
  await request.post('/v1/backup-storages/', {
    data: {
      name: 'ui-dev',
      description: 'CI test bucket',
      type: 's3',
      bucketName: 'backup-test',
      secretKey: 'mySecretKey',
      accessKey: 'myAccessKey',
      url: 'https://s3.us-west-2.amazonaws.com',
      region: 'us-west-2',
    },
  });
});

// setup('Monitoring setup', async ({ request }) => {
//   await createMonitoringInstance(request, testMonitoringName);
//   await createMonitoringInstance(request, testMonitoringName2);
// });
