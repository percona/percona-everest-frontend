import { useContext } from 'react';
import { DBClustersContext } from '../../contexts/db-cluster/db-cluster.context';
import { DbWizardMode } from './database-form.types';

export const useDatabasePageMode = (): DbWizardMode => {
  const { dbClusterName } = useContext(DBClustersContext);
  return dbClusterName ? 'edit' : 'new';
};
