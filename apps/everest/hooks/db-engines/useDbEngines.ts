import { useQuery } from "react-query";
import { DbEngine, GetDbEnginesPayload } from "../../types/dbEngines.types";
import { useSelectedKubernetesCluster } from "../kubernetesClusters/useSelectedKubernetesCluster";
import { getDbEnginesFn } from "../../api/dbEngineApi";

export const useDbEngines = () => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<GetDbEnginesPayload, unknown, DbEngine[]>('dbEngines', () => getDbEnginesFn(id), {
    select: ({ items = [] }) => items.map(({ spec: { type }, status: { status, version } }) => ({ type, status, version }))
  })
};
