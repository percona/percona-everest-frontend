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
import {
  DbCluster,
  GetDbClusterCredentialsPayload,
  GetDbClusterPayload,
} from 'shared-types/dbCluster.types';
import { api } from './api';

export const createDbClusterFn = async (data: DbCluster, namespace: string) => {
  const response = await api.post(
    `namespaces/${namespace}/database-clusters`,
    data
  );

  return response.data;
};

export const updateDbClusterFn = async (
  dbClusterName: string,
  namespace: string,
  data: DbCluster
) => {
  const response = await api.put(
    `namespaces/${namespace}/database-clusters/${dbClusterName}`,
    data
  );

  return response.data;
};

export const getDbClustersFn = async (namespace: string) => {
  const response = await api.get<GetDbClusterPayload>(
    `namespaces/${namespace}/database-clusters`
  );
  return response.data;
};

export const getDbClusterCredentialsFn = async (
  dbClusterName: string,
  namespace: string
) => {
  const response = await api.get<GetDbClusterCredentialsPayload>(
    `namespaces/${namespace}/database-clusters/${dbClusterName}/credentials`
  );

  return response.data;
};

export const getDbClusterFn = async (
  dbClusterName: string,
  namespace: string
) => {
  const response = await api.get<DbCluster>(
    `namespaces/${namespace}/database-clusters/${dbClusterName}`
  );
  return response.data;
};

export const deleteDbClusterFn = async (
  dbClusterName: string,
  namespace: string
) => {
  const response = await api.delete<DbCluster>(
    `namespaces/${namespace}/database-clusters/${dbClusterName}`
  );
  return response.data;
};
