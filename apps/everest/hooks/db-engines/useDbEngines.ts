import { useQuery } from 'react-query';
import { DbEngine, DbEngineStatus, EngineToolPayload, GetDbEnginesPayload } from '../../types/dbEngines.types';
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
import { getDbEnginesFn } from '../../api/dbEngineApi';

export const useDbEngines = () => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<GetDbEnginesPayload, unknown, DbEngine[]>(
    'dbEngines',
    () => getDbEnginesFn(id),
    {
      select: ({ items = [] }) =>
        items
          .filter((item) => item.status.status === DbEngineStatus.INSTALLED)
          .map(({
            spec: {
              type,
            },
            status: {
              status,
              availableVersions,
              operatorVersion,
            }
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
                !availableVersions
                || !Object.keys(availableVersions).length
                || !availableVersions[toolName]
              ) {
                return;
              }

              const tool: Record<string, EngineToolPayload> = availableVersions[toolName];
              const versions = Object.keys(tool);

              versions.forEach((version) => {
                result.availableVersions[toolName].push({
                  version,
                  ...tool[version]
                });
              });
            });

            return result;
          }),
    }
  );
};
