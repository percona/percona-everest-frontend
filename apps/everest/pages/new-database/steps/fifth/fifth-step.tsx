import { Typography } from "@mui/material";
import React from "react";
import { useFormContext } from "react-hook-form";
import { Messages } from "./fifth-step.messages";
import { FormGroup } from "@mui/material";
import { FormControlLabel } from "@mui/material";
import { Controller } from "react-hook-form";
import { Switch } from "@mui/material";
import { TextField } from "@mui/material";

export const FifthStep = () => {
  const { control, watch } = useFormContext();
  const monitoring = watch('monitoring');

  return (
    <>
      <Typography variant="h5">{Messages.monitoring}</Typography>
      <Typography variant="caption">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          label={Messages.monitoringEnabled}
          data-testid="switch-monitoring"
          control={
            <Controller
              control={control}
              name="monitoring"
              render={({ field }) => (
                <Switch {...field} checked={field.value} />
              )}
            />
          }
        />
        {
          monitoring && (
            <>
              <Typography variant="h6" sx={{ mt: 5 }}>{Messages.endpointName}</Typography>
              <Controller
                control={control}
                name='endpoint'
                rules={{
                  required: true
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder={Messages.endpointPlaceholder}
                    error={error !== undefined}
                    helperText={error ? Messages.endpointError : ''}
                    inputProps={{
                      'data-testid': 'text-endpoint'
                    }}
                  />
                )}
              />
            </>
          )
        }
      </FormGroup>
    </>
  );
}
