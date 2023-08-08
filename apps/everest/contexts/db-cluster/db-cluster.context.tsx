import React, { createContext, useState } from 'react';
import { DBClusterContextType } from './db-cluster.context.types';

export const DBClustersContext = createContext<DBClusterContextType>({
  dbClusterName: '',
});

export const DBClusterContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [dbClusterName, setDbClusterName] = useState<string>('');

  const setSelectedDBClusterName = (dbCluster: string) => {
    setDbClusterName(dbCluster);
  };

  return (
    <DBClustersContext.Provider
      value={{ dbClusterName, setSelectedDBClusterName }}
    >
      {children}
    </DBClustersContext.Provider>
  );
};
