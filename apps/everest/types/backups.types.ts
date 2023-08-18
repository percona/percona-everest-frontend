export type GetBackupPayload = {
  items: Array<{
    metadata: {
      name: string;
    };
    status: {
      created: string;
      completed: string;
      state: string;
    };
    spec: {
      dbClusterName: string;
      backupStorageName: string;
    };
  }>
};

export type Backup = {
  name: string;
  created: Date | null;
  completed: Date | null;
  state: string;
  dbClusterName: string;
  backupStorageName: string;
}
