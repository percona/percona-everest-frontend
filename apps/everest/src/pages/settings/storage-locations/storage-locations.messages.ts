export const Messages = {
  createEditModal: {
    addEditModal: (isEditMode: boolean) =>
      `${isEditMode ? 'Edit' : 'Add'} Backup storage`,
    addEditButton: (isEditMode: boolean) => (isEditMode ? 'Edit' : 'Add'),
    cancel: 'Cancel',
    placeholders: {
      name: 'Insert storage display name',
      descriptions: 'Insert an optional description',
      namespaces: 'Select namespaces',
    },
    helperText: {
      namespaces:
        'Select in which namespaces this storage should be available.',
    },
  },
  deleteDialog: {
    header: 'Delete storage',
    content: `Are you sure you want to permanently delete this storage location? Any
database clusters using this storage will no longer be able to execute
their scheduled backup jobs.`,
  },
  s3: 'Amazon S3',
  gcs: 'Google Cloud Storage',
  azure: 'Azure Cloud Storage',
  name: 'Name',
  namespaces: 'Namespaces',
  type: 'Type',
  bucketName: 'Bucket Name',
  description: 'Description',
  region: 'Region',
  url: 'Endpoint',
  accessKey: 'Access Key',
  secretKey: 'Secret Key',
  edit: 'Edit',
  delete: 'Delete',
  addStorageLocationButton: 'Add backup storage',
  noData: "No storage location set up yet. Let's get started!",
};
