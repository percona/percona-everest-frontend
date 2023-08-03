import { UseQueryResult } from 'react-query';
import { KubernetesClusterList } from '../../types/kubernetes.types';

export type KubernetesContextType = {
  clusters?: UseQueryResult<KubernetesClusterList, unknown>;
};
