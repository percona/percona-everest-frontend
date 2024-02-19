export const Messages = {
  noStoragesMessage: (namespace: string) =>
    `To enable backups for the ${namespace} namespace, first add a storage location within the same namespace. If you want to proceed without the backups, disable them.`,
  addStorage: 'Add storage',
};
