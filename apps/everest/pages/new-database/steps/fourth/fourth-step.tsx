import { IconButton, InputAdornment, Switch, TextField, Typography } from "@mui/material";
import React from "react";
import { Messages } from "./fourth-step.messages";
import { FormControlLabel, FormGroup } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller } from "react-hook-form";
import { useFormContext } from "react-hook-form";
import { IP_RANGE_PATTERN } from "./fourth-step.constants";

export const FourthStep = () => {
  const { control, setValue, watch } = useFormContext();
  const externalAccess = watch('externalAccess');

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
                <Switch {...field} checked={field.value} />
              )}
            />
          }
        />
        {
          externalAccess && (
            <>
              <FormControlLabel
                label={Messages.internetFacing}
                control={
                  <Controller
                    control={control}
                    name="internetFacing"
                    render={({ field }) => (
                      <Switch {...field} checked={field.value} />
                    )}
                  />
                }
              />
              <Typography variant="h6" sx={{ mt: 5 }}>{Messages.sourceRange}</Typography>
              <Controller
                control={control}
                name='sourceRange'
                rules={{
                  required: true,
                  pattern: IP_RANGE_PATTERN
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    variant="outlined"
                    placeholder={Messages.sourceRangePlaceholder}
                    error={error !== undefined}
                    helperText={error ? Messages.sourceRangeError : ''}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setValue('sourceRange', '', { shouldValidate: true })}>
                            <DeleteIcon />
                          </IconButton>
                        </InputAdornment>
                      )
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
