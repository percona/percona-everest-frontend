import { useQuery } from "react-query";
import { useSelectedKubernetesCluster } from '../kubernetesClusters/useSelectedKubernetesCluster';
import { getKubernetesResourcesFn } from "../../../api/resources";
import { GetKubernetesResourcesPayload, KubernetesClusterResources } from "../../../types/resources.types";

export const useKubernetesResources = () => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<GetKubernetesResourcesPayload, unknown, KubernetesClusterResources>(
    `${id}-resources`,
    () => getKubernetesResourcesFn(id),
    {
      placeholderData: {
        available: {
          cpuMillis: 30 * 1000,
          memoryBytes: 28 * 10**9,
          diskSize: 123 * 10**9,
        },
        capacity: {
          cpuMillis: 32 * 1000,
          memoryBytes: 40 * 10**9,
          diskSize: 200 * 10**9,
        }
      }
    }
  );
};