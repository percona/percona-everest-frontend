import { useQuery } from 'react-query';
import {
  GetKubernetesClusterInfoPayload,
  KubernetesClusterInfo,
} from '../../../shared-types/kubernetes.types';
import { getKubernetesClusterInfoFn } from '../../../api/kubernetesClusterApi';
import { useSelectedKubernetesCluster } from './useSelectedKubernetesCluster';

export const useKubernetesClusterInfo = () => {
  const { id } = useSelectedKubernetesCluster();

  return useQuery<
    GetKubernetesClusterInfoPayload,
    unknown,
    KubernetesClusterInfo
  >(`${id}-cluster-info`, () => getKubernetesClusterInfoFn(id));
};
