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

import { test } from '@playwright/test';
// import { getK8sClusters } from '../utils/k8s-clusters';
// import { getEnginesVersions } from '../utils/database-engines';
// import { getClusterDetailedInfo } from '../utils/storage-class';

test.describe('DB Cluster creation', () => {
  // let kubernetesId;
  // let engineVersions = {
  //   pxc: [],
  //   psmdb: [],
  //   postgresql: [],
  // };
  // let storageClasses = [];

  test.beforeAll(async () => {
    // kubernetesId = (await getK8sClusters(request))[0].id;
    // engineVersions = await getEnginesVersions(request, kubernetesId);
    // const { storageClassNames = [] } = await getClusterDetailedInfo(
    //   request,
    //   kubernetesId
    // );
    // storageClasses = storageClassNames;
    // TODO createDbCluster(request);
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('/databases');
    const closeIcon = page.getByTestId('close-dialog-icon');
    if (closeIcon) {
      await closeIcon.click();
    }
  });

  test('Editing', async () => {
    // TODO editing flow by steps
  });
});
