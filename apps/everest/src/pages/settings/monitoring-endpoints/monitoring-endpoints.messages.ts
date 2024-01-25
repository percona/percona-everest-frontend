export const Messages = {
  add: 'Add Endpoint',
  edit: 'Edit',
  delete: 'Delete',
  deleteDialogHeader: 'Delete monitoring endpoint',
  addEditDialogHeader: (editMode: boolean) =>
    `${editMode ? 'Edit' : 'Add'} monitoring endpoint`,
  deleteConfirmation: (endpoint: string) =>
    `Are you sure you want to permanently delete endpoint "${endpoint}"?`,
  fieldLabels: {
    name: 'Name',
    endpoint: 'Endpoint',
    user: 'User',
    password: 'Password',
    apiKey: 'API Key',
  },
};
