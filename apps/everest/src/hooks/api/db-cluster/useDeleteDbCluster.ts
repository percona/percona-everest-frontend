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

import { useMutation, UseMutationOptions } from 'react-query';
import { deleteDbClusterFn } from 'api/dbClusterApi';

type DeleteDbClusterArgType = {
  dbClusterName: string;
  namespace: string;
};
export const useDeleteDbCluster = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    DeleteDbClusterArgType,
    unknown
  >
) => {
  return useMutation(
    ({ dbClusterName, namespace }: DeleteDbClusterArgType) =>
      deleteDbClusterFn(dbClusterName, namespace),
    {
      ...options,
    }
  );
};
