import {
  ErrorIcon,
  PausedIcon,
  PendingIcon,
  SuccessIcon,
  UknownIcon,
} from '@percona/ui-lib.icons.status';
import React from 'react';
import { Stack, SvgIconProps } from '@mui/material';
import { StatusFieldProps, BaseStatus } from './status-field.types';

const STATUS_TO_ICON: Record<
BaseStatus,
  (props: SvgIconProps) => React.JSX.Element
> = {
  'success': SuccessIcon,
  'error': ErrorIcon,
  'pending': PendingIcon,
  'paused': PausedIcon,
  'unknown': UknownIcon,
};

export function StatusField<T extends string | number | symbol>({ status, statusMap, children }: StatusFieldProps<T>) {
  const mappedStatus: BaseStatus = statusMap[status]
  const MappedIcon = STATUS_TO_ICON[mappedStatus] || UknownIcon;

  return (
    <Stack direction='row' gap={1}>
      <MappedIcon/>
      {children}
    </Stack>
  );
};
