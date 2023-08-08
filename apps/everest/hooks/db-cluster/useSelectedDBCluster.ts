import { useContext } from 'react';
import { DBClustersContext } from '../../contexts/db-cluster/db-cluster.context';

export const useSelectedDBCluster = (): {
  dbClusterName: string;
  setSelectedDBClusterName: (dbCluster: string) => void;
} => {
  const { dbClusterName, setSelectedDBClusterName } =
    useContext(DBClustersContext);

  // TODO this might be not correct if we have multiple clusters in the future
  return { dbClusterName, setSelectedDBClusterName };
};
