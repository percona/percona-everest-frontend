import { Stack } from '@mui/material';
import { UknownIcon } from '@percona/ui-lib.icons.status';
import React from 'react';
import { BaseStatus, StatusFieldProps } from './status-field.types';
import { STATUS_TO_ICON } from './status-field.utils';

export function StatusField<T extends string | number | symbol>({
  status,
  statusMap,
  children,
  dataTestId,
}: StatusFieldProps<T>) {
  const mappedStatus: BaseStatus = statusMap[status];
  const MappedIcon = STATUS_TO_ICON[mappedStatus] || UknownIcon;

  return (
    <Stack direction="row" gap={1} data-testid={`${dataTestId? `${dataTestId}-`: ''}status`}>
      <MappedIcon />
      {children}
    </Stack>
  );
}
