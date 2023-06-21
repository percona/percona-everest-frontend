export const Messages = {
  pageTitle: 'Resources',
  pageDescription:
    'Configure the resources-legend your new database will have access to.',
  labels: {
    numberOfNodes: 'Number of nodes',
    resourceSizePerNode: 'Resource size per node',
    cpu: 'CPU',
    memory: 'Memory',
    disk: 'Disk',
  },
  alerts: {
    resourcesCapacityExceeding: (name: string) =>
      `The resources you have specified exceed the available ${name} capacity of the cluster node. Database creation might fail.`,
  },
};
