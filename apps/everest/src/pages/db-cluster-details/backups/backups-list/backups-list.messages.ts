export const Messages = {
  deleteDialog: {
    header: 'Delete backup',
    content: (backupName: string) =>
      `Are you sure you want to permanently delete "${backupName}" and any datasets it contains?`,
  },
  restoreDialog: {
    header: 'Restore to this database',
    content:
      'Are you sure you want to restore the selected backup? This will update your database to the selected instance.',
    submitButton: 'Restore',
  },
  restoreDialogToNewDb: {
    header: 'Create database from backup',
    content:
      'Are you sure you want to replicate the selected database? This will create an exact copy of the current instance.',
    submitButton: 'Create',
  },
  noData: "You don't have any backups yet. Create one to get started.",
  createBackup: 'Create backup',
  now: 'Now',
  schedule: 'Schedule',
  delete: 'Delete',
  restore: 'Restore to this DB',
  restoreToNewDb: 'Create new DB',
};
