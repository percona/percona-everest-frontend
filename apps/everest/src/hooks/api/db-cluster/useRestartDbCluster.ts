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

import { UseMutationOptions, useMutation } from 'react-query';
import { updateDbClusterFn } from '../../../api/dbClusterApi';
import { DbCluster } from '../../../shared-types/dbCluster.types';

type PausedDBClusterArgType = {
  k8sClusterId: string;
  dbCluster: DbCluster;
};

export const useRestartDbCluster = (
  options?: UseMutationOptions<unknown, unknown, PausedDBClusterArgType, unknown>
) => {
  return useMutation(
    ({ k8sClusterId, dbCluster }: PausedDBClusterArgType) => {
      const payload: DbCluster = {
        ...dbCluster,
        metadata: {
          ...dbCluster.metadata,
          annotations: {
            'everest.percona.com/restart': 'true',
          },
        },
      };
      return updateDbClusterFn(
        k8sClusterId,
        dbCluster?.metadata?.name,
        payload
      );
    },
    { ...options }
  );
};
