import React from "react";
import { ToggleButtonGroup } from "@mui/material";
import { Typography } from "@mui/material";
import { DbToggleCard, DbType } from "@percona/ui-lib.db-toggle-card";
import { Controller, useFormContext } from "react-hook-form";

export const FirstStep = () => {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="h6">
        What Database type do you want to deploy?
      </Typography>
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
              value: string
            ) => {
              event.target.value = value;
              field.onChange(event);
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
