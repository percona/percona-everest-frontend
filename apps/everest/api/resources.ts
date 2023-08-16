import { GetKubernetesResourcesPayload, KubernetesClusterResources } from '../types/resources.types';
import { api } from './api';

export const getKubernetesResourcesFn = async (clusterId: string) => {
  const response = await api.get<GetKubernetesResourcesPayload>(
    `kubernetes/${clusterId}/resources`
  );

  return response.data;
};
