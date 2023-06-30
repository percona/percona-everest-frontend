import { api } from './api';
import { KubernetesClusterList } from '../types/kubernetes.types';

export const getKubernetesClustersFn = async () => {
  const response = await api.get<KubernetesClusterList>('kubernetes');

  return response.data;
};