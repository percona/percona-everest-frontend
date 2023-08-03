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
import {
  DbEngine,
  DbEngineStatus,
  EngineToolPayload,
  GetDbEnginesPayload,
} from '../../../types/dbEngines.types';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
import { getDbEnginesFn } from '../../../api/dbEngineApi';

export const useDbEngines = () => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<GetDbEnginesPayload, unknown, DbEngine[]>(
    'dbEngines',
    () => getDbEnginesFn(id),
    {
      select: ({ items = [] }) =>
        items
          .filter((item) => item.status.status === DbEngineStatus.INSTALLED)
          .map(
            ({
              spec: { type },
              status: { status, availableVersions, operatorVersion },
            }) => {
              const result: DbEngine = {
                type,
                operatorVersion,
                status,
                availableVersions: {
                  backup: [],
                  engine: [],
                  proxy: [],
                },
              };

              ['backup', 'engine', 'proxy'].forEach((toolName) => {
                if (
                  !availableVersions ||
                  !Object.keys(availableVersions).length ||
                  !availableVersions[toolName]
                ) {
                  return;
                }

                const tool: Record<string, EngineToolPayload> =
                  availableVersions[toolName];
                const versions = Object.keys(tool);

                versions.forEach((version) => {
                  result.availableVersions[toolName].push({
                    version,
                    ...tool[version],
                  });
                });
              });

              return result;
            }
          ),
    }
  );
};
