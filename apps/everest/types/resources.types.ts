export type Resource = {
  cpuMillis: number;
  diskSize: number;
  memoryBytes: number;
}

export type GetKubernetesResourcesPayload = {
  available: Resource;
  capacity: Resource;
}

export type KubernetesClusterResources = GetKubernetesResourcesPayload;
