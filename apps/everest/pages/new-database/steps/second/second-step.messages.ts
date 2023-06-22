const getResourceNames = (names: string[]): string => {
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} and ${names[1]}`;
  if (names.length === 3) return `${names[0]}, ${names[1]}, and ${names[2]}`;
};
export const Messages = {
  pageTitle: 'Resources',
  pageDescription:
    'Configure the resources-legend your new database will have access to.',
  labels: {
    numberOfNodes: 'Number of nodes',
    resourceSizePerNode: 'Resource size per node',
    cpu: 'CPU',
    memory: 'memory',
    disk: 'disk',
  },
  alerts: {
    resourcesCapacityExceeding: (names: string[]) =>
      `The resources you have specified exceed the available ${getResourceNames(
        names
      )} capacity of the cluster node. Database creation might fail.`,
  },
};
