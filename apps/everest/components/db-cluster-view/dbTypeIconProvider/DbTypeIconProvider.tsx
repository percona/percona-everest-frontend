import {
  MongoLeafIcon,
  MySqlDolphinIcon,
  PostgreSqlElephantIcon,
} from '@percona/ui-lib.icons.db';
import React from 'react';
import { DbTypeIconProviderProps } from '../dbClusterView.type';

export const DbTypeIconProvider = ({ dbType }: DbTypeIconProviderProps) => {
  switch (dbType) {
    case 'pxc':
      return <MySqlDolphinIcon />;
    case 'psmdb':
      return <MongoLeafIcon />;
    case 'postgresql':
      return <PostgreSqlElephantIcon />;
    default:
      return null;
  }
};
