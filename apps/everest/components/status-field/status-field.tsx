import { UknownIcon } from '@percona/ui-lib.icons.status';
import React from 'react';
import { Stack } from '@mui/material';
import { StatusFieldProps, BaseStatus } from './status-field.types';
import { STATUS_TO_ICON } from './status-field.utils';

export function StatusField<T extends string | number | symbol>({
  status,
  statusMap,
  children,
}: StatusFieldProps<T>) {
  const mappedStatus: BaseStatus = statusMap[status];
  const MappedIcon = STATUS_TO_ICON[mappedStatus] || UknownIcon;

  return (
    <Stack direction="row" gap={1}>
      <MappedIcon />
      {children}
    </Stack>
  );
}
