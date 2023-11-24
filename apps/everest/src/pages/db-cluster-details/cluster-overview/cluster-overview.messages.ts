export const Messages = {
  titles: {
    dbDetails: 'Database Details',
    basicInformation: 'Basic Information',
    resources: 'Resources',
    externalAccess: 'External Access',
    monitoring: 'Monitoring',
    connectionDetails: 'Connection Details',
    port: 'Port',
    username: 'Username',
    password: 'Password',
    host: 'Host',
    backups: 'Backups',
    scheduledBackups: 'Scheduled Backups',
  },
  fields: {
    type: (type?: string) => `Type: ${type}`,
    name: (clusterName?: string) => `Name: ${clusterName}`,
    namespace: (namespace?: string) => `Namespace: ${namespace}`,
    version: (type?: string) => `Version: ${type}`,
    numberOfNodes: (numberOfNodes?: number) =>
      `Number of nodes: ${numberOfNodes}`,
    cpu: (cpu?: string | number) => `CPU: ${cpu}`,
    memory: (memory: string | number) => `Memory: ${memory}`,
    disk: (disk: string | number) => `Disk: ${disk}`,
    enabled: `Enabled`,
    disabled: `Disabled`,
  },
};
