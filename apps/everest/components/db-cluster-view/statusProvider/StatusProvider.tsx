import {
  ErrorIcon,
  PausedIcon,
  PendingIcon,
  SuccessIcon,
  UknownIcon,
} from '@percona/ui-lib.icons.status';
import React from 'react';
import { SvgIconProps } from '@mui/material';
import { StatusProviderProps } from '../dbClusterView.type';
import { DbClusterStatus } from '../../../types/dbCluster.types';
import { beautifyDbClusterStatus } from '../DbClusterView.utils';

const DB_CLUSTER_STATUS_TO_STATUS_PROVIDER: Record<
  DbClusterStatus,
  (props: SvgIconProps) => React.JSX.Element
> = {
  [DbClusterStatus.ready]: SuccessIcon,
  [DbClusterStatus.error]: ErrorIcon,
  [DbClusterStatus.initializing]: PendingIcon,
  [DbClusterStatus.pausing]: PendingIcon,
  [DbClusterStatus.paused]: PausedIcon,
  [DbClusterStatus.stopping]: PendingIcon,
  [DbClusterStatus.unknown]: UknownIcon,
};

export const StatusProvider = ({ status }: StatusProviderProps) => {
  const MappedIcon = DB_CLUSTER_STATUS_TO_STATUS_PROVIDER[status] || UknownIcon;

  return (
    <>
      <MappedIcon />
      {beautifyDbClusterStatus(status)}
    </>
  );
};
