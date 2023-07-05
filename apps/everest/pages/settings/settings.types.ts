export const enum SettingsTabs {
  defaultConfigurations = 'default-configurations',
  storageLocations = 'storage-locations',
  monitoringEndpoints = 'monitoring-endpoints',
  k8sClusters = 'k8s-clusters',
}

export const settingsTabsMui: Record<SettingsTabs, number> = {
  [SettingsTabs.defaultConfigurations]: 0,
  [SettingsTabs.storageLocations]: 1,
  [SettingsTabs.monitoringEndpoints]: 2,
  [SettingsTabs.k8sClusters]: 3,
};
