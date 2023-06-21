import { useQuery } from "react-query";
import { GetDbEnginesPayload } from "../../types/dbEngines.types";
import { useSelectedKubernetesCluster } from "../kubernetesClusters/useSelectedKubernetesCluster";

export const useDbEngines = () => {
  const { id } =  useSelectedKubernetesCluster();

  return useQuery<GetDbEnginesPayload>('kubernetesClusters', async () => {
    const result = await fetch(`/v1/kubernetes/${id}/database-engines`);

    if (!result.ok) {
      throw new Error();
    }

    return result.json();
  }, { refetchOnWindowFocus: false })
};
