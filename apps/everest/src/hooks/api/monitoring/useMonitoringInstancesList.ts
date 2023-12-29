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
import { UseMutationOptions, useMutation, useQuery } from 'react-query';
import {
  getMonitoringInstancesFn,
  createMonitoringInstanceFn,
  deleteMonitoringInstanceFn,
} from 'api/monitoring';
import {
  CreateMonitoringInstancePayload,
  MonitoringInstance,
  MonitoringInstanceList,
} from 'shared-types/monitoring.types';

export const MONITORING_INSTANCES_QUERY_KEY = 'monitoringInstances';

export const useMonitoringInstancesList = (enabled?: boolean) =>
  useQuery<MonitoringInstanceList>(
    MONITORING_INSTANCES_QUERY_KEY,
    () => getMonitoringInstancesFn(),
    {
      enabled,
    }
  );

export const useCreateMonitoringInstance = (
  options?: UseMutationOptions<
    MonitoringInstance,
    unknown,
    CreateMonitoringInstancePayload,
    unknown
  >
) =>
  useMutation(
    (payload: CreateMonitoringInstancePayload) =>
      createMonitoringInstanceFn(payload),
    options
  );

export const useDeleteMonitoringInstance = () =>
  useMutation((instanceName: string) =>
    deleteMonitoringInstanceFn(instanceName)
  );
