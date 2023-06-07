import { Switch, Typography } from "@mui/material";
import React from "react";
import { Messages } from "./fourth-step.messages";
import { FormControlLabel } from "@mui/material";
import { FormGroup } from "@mui/material";
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";

export const FourthStep = () => {
  const { control } = useFormContext();

  return (
    <>
      <Typography variant="h6">{Messages.externalAccess}</Typography>
      <Typography variant="caption">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          label={Messages.enableExternalAccess}
          control={
            <Controller
              control={control}
              name="externalAccess"
              render={({ field }) => (
                <Switch {...field} checked={field.value}/>
              )}
            />
          }
        />
      </FormGroup>
    </>
  );
}
