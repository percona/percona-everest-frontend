import {
  ErrorIcon,
  PausedIcon,
  PendingIcon,
  SuccessIcon,
  UknownIcon,
} from '@percona/ui-lib.icons.status';
import React from 'react';
import { Messages } from '../dbClusterView.messages';
import { StatusProviderProps } from '../dbClusterView.type';
import { DbClusterStatus } from '../../../types/dbCluster.types';

export const StatusProvider = ({ status }: StatusProviderProps) => {
  switch (status) {
    case DbClusterStatus.ready:
      return (
        <>
          <SuccessIcon />
          {Messages.statusProvider.up}
        </>
      );
    case DbClusterStatus.error:
      return (
        <>
          <ErrorIcon />
          {Messages.statusProvider.down}
        </>
      );
    case DbClusterStatus.initializing:
      return (
        <>
          <PendingIcon />
          {Messages.statusProvider.initializing}
        </>
      );
    case DbClusterStatus.pausing:
      return (
        <>
          <PendingIcon />
          {Messages.statusProvider.pausing}
        </>
      );
    case DbClusterStatus.stopping:
      return (
        <>
          <PendingIcon />
          {Messages.statusProvider.stopping}
        </>
      );
    case DbClusterStatus.paused:
      return (
        <>
          <PausedIcon />
          {Messages.statusProvider.paused}
        </>
      );
    case DbClusterStatus.unknown:
      return (
        <>
          <UknownIcon />
          {Messages.statusProvider.unknown}
        </>
      );
    default:
      return null;
  }
};
