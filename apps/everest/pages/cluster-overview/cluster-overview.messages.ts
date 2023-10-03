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
    port: 'Port',
  },
  fields: {
    type: (type?: string) => `Type: ${type}`,
    name: (clusterName?: string) => `Name: ${clusterName}`,
    namespace: (namespace?: string) => `Namespace: ${namespace}`,
    version: (type?: string) => `Version: ${type}`,
    numberOfNodes: (numberOfNodes?: number) => `Number of nodes: ${numberOfNodes}`,
    cpu: (cpu?: string | number) => `CPU: ${cpu}`,

    enabled: `Enabled`,
    disabled: `Disabled`,
  },
};
