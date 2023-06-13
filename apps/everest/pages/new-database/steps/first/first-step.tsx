import React from 'react';
import { ToggleButtonGroup, Typography } from '@mui/material';

import { DbToggleCard, DbType } from '@percona/ui-lib.db-toggle-card';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from './first-step.messages';

export const FirstStep = () => {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="h6">{Messages.dbTypeQuestion}</Typography>
      <Controller
        name="dbType"
        control={control}
        render={({ field }) => (
          <ToggleButtonGroup
            {...field}
            fullWidth
            exclusive
            sx={{ marginTop: 1 }}
            onChange={(
              event: React.MouseEvent<HTMLElement> | any,
              value: DbType
            ) => {
              if (value !== null) {
                const newEvent = event;
                newEvent.target.value = value;
                field.onChange(newEvent);
              }
            }}
          >
            <DbToggleCard value={DbType.Postresql} />
            <DbToggleCard value={DbType.Mongo} />
            <DbToggleCard value={DbType.Mysql} />
          </ToggleButtonGroup>
        )}
      />
    </>
  );
};
