import { getResourceNames } from './second-step.utils';

export const Messages = {
  pageTitle: 'Resources',
  pageDescription:
    'Configure the resources your new database will have access to.',
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
