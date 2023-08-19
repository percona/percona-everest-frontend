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
import { test, expect } from '@playwright/test';
import { GetDbClusterPayload } from '../../types/dbCluster.types';
import {
  createDbClusterPageIsReady,
  dbEnginesButtonsIsReady,
  EngineVersions,
} from './utils/createDbClusterForm';
import { getK8sClusters } from './utils/k8sClusters';
import { getEnginesVersions } from './utils/database-engines';
import {createDbCluster} from "./utils/dbCluster";

let kubernetesId;

let engineVersions: EngineVersions = {
  pxc: [],
  psmdb: [],
  postgresql: [],
};

test.beforeAll(async ({ request }) => {
  const k8sClusters = await getK8sClusters(request);
  kubernetesId = k8sClusters[0].id;
});

test('Cluster editing', async ({ page, request }) => {
  await page.goto('/databases');
  await page.pause();
  await createDbCluster(request);
  // dbcluster create
  // find all actions
  // edit
  //
});
