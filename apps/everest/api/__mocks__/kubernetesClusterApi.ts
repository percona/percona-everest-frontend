import { KubernetesClusterList } from '../../types/kubernetes.types';

export const getKubernetesClustersFn =
  async (): Promise<KubernetesClusterList> => {
    return [
      {
        id: 'cluster_one',
        name: 'Cluster one',
      },
    ];
  };
