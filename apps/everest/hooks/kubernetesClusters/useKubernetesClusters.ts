import { useQuery } from "react-query";
import { KubernetesClusterList } from "../../types/kubernetes.types";

export const useKubernetesClusters = () => {
  return useQuery<KubernetesClusterList>('kubernetesClusters', async () => {
    const result = await fetch('/api/v1/kubernetes');

    if (!result.ok) {
      throw new Error();
    }

    return await result.json();
  }, { refetchOnWindowFocus: false })
};
