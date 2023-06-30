import { useQuery } from "react-query";
import { KubernetesClusterList } from "../../types/kubernetes.types";
import { getKubernetesClustersFn } from "../../api/kubernetesClusterApi";

export const useKubernetesClusters = () =>
  useQuery<KubernetesClusterList>('kubernetesClusters', () => getKubernetesClustersFn())
