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

import React, { useContext } from 'react';
import { DbClusterView } from '../../components/db-cluster-view/DbClusterView';
import { K8Context } from '../../contexts/kubernetes/kubernetes.context';
import { NoKubernetes } from './no-kubernetes/no-kubernetes';

export const DatabasesPage = () => {
  const { clusters } = useContext(K8Context);
  const noKubernetesClusters = !clusters?.data?.length;

  return noKubernetesClusters ? <NoKubernetes /> : <DbClusterView />;
};
