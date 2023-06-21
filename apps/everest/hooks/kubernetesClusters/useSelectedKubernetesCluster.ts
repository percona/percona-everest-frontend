import { useQuery } from "react-query";
import { KubernetesClusterList } from "../../types/kubernetes.types";
import { useContext } from "react";
import { K8Context } from "../../contexts/kubernetes/kubernetes.context";

export const useSelectedKubernetesCluster = () => {
  const { clusters } = useContext(K8Context);

  const clusterData = (clusters?.data || []);

  // TODO this might be not correct if we have multiple clusters in the future
  return clusterData[0];
};
