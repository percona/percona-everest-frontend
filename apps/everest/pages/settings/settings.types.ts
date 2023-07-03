export const enum SettingsTabs {
  defaultConfigurations = 'defaultConfigurations',
  storageLocations = 'storageLocations',
  monitoringEndpoints = 'monitoringEndpoints',
  k8sClusters = 'k8sClusters',
}

export const settingsTabsMui: Record<SettingsTabs, number> = {
  [SettingsTabs.defaultConfigurations]: 0,
  [SettingsTabs.storageLocations]: 1,
  [SettingsTabs.monitoringEndpoints]: 2,
  [SettingsTabs.k8sClusters]: 3,
};
