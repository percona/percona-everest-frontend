import {
  ErrorIcon,
  PausedIcon,
  PendingIcon,
  SuccessIcon,
  UknownIcon,
} from '@percona/ui-lib.icons.status';
import React from 'react';
import { DbClusterStatus } from '../../../hooks/db-clusters/dbCluster.type';
import { StatusProviderProps } from '../dbClusterView.type';

export const StatusProvider = ({ status }: StatusProviderProps) => {
  switch (status) {
    case DbClusterStatus.ready:
      return (
        <>
          <SuccessIcon />
          Up
        </>
      );
    case DbClusterStatus.error:
      return (
        <>
          <ErrorIcon />
          Down
        </>
      );
    case DbClusterStatus.initializing:
      return (
        <>
          <PendingIcon />
          Initializing
        </>
      );
    case DbClusterStatus.pausing:
      return (
        <>
          <PendingIcon />
          Pausing
        </>
      );
    case DbClusterStatus.stopping:
      return (
        <>
          <PendingIcon />
          Stopping
        </>
      );
    case DbClusterStatus.paused:
      return (
        <>
          <PausedIcon />
          Paused
        </>
      );
    case DbClusterStatus.unknown:
      return (
        <>
          <UknownIcon />
          Unknown
        </>
      );
    default:
      return null;
  }
};
