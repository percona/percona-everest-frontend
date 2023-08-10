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
import { useQuery } from 'react-query';
import { DbCluster } from '../../../types/dbCluster.types';

import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
import { useSelectedDBCluster } from '../../db-cluster/useSelectedDBCluster';
import { getDbClusterFn } from '../../../api/dbClusterApi';

export const useDbCluster = (enabled?: boolean) => {
  const { id } = useSelectedKubernetesCluster();
  const { dbClusterName } = useSelectedDBCluster();

  return useQuery<DbCluster, unknown, DbCluster>(
    'dbCluster',
    () => getDbClusterFn(id, dbClusterName),
    {
      enabled,
    }
  );
};
