export const Messages = {
  createEditModal: {
    addEditModal: (isEditMode: boolean) =>
      `${isEditMode ? 'Edit' : 'Add'} Backup storage`,
    addEditButton: (isEditMode: boolean) => (isEditMode ? 'Edit' : 'Add'),
    cancel: 'Cancel',
  },
  s3: 'Amazon S3',
  gcs: 'Google Cloud Storage',
  azure: 'Azure Cloud Storage',
  name: 'Name',
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
};
