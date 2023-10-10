import React from 'react';
import { ScheduledBackupsList } from './scheduled-backups-list/scheduled-backups-list';
import { BackupsList } from './backups-list/backups-list';
import { useParams } from 'react-router-dom';
import { useDbCluster } from '../../../hooks/api/db-cluster/useDbCluster';
import { DbEngineType } from '../../../types/dbEngines.types';

export const Backups = () => {
  const { dbClusterName } = useParams();

  const { data: dbCluster } = useDbCluster(
    dbClusterName || '',
    !!dbClusterName
  );

  const dbType = dbCluster?.spec?.engine?.type;

  return (
    <>
      {dbType !== DbEngineType.POSTGRESQL && <ScheduledBackupsList />}
      <BackupsList />
    </>
  );
};
