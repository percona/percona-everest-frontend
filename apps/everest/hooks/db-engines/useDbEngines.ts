import { useQuery } from "react-query";
import { DbEngine, GetDbEnginesPayload } from "../../types/dbEngines.types";
import { useSelectedKubernetesCluster } from "../kubernetesClusters/useSelectedKubernetesCluster";

export const useDbEngines = () => {
  const { id } =  useSelectedKubernetesCluster();

  return useQuery<DbEngine[]>('dbEngines', async () => {
    const result = await fetch(`/v1/kubernetes/${id}/database-engines`);

    if (!result.ok) {
      throw new Error();
    }

    const { items = [] }: GetDbEnginesPayload = await result.json();

    return items.map(({ spec: { type }, status: { status, version } }) => ({ type, status, version }))
  }, { refetchOnWindowFocus: false })
};
