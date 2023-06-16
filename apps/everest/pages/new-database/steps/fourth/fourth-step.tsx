import {
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import React from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from './fourth-step.messages';

import { IP_RANGE_PATTERN } from './fourth-step.constants';

export const FourthStep = () => {
  const { control, setValue, watch } = useFormContext();
  const externalAccess = watch('externalAccess');

  return (
    <>
      <Typography variant="h5">{Messages.externalAccess}</Typography>
      <Typography variant="subtitle2">{Messages.caption}</Typography>
      <FormGroup sx={{ mt: 2 }}>
        <FormControlLabel
          label={Messages.enableExternalAccess}
          data-testid="switch-external-access"
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
        {externalAccess && (
          <>
            <FormControlLabel
              label={Messages.internetFacing}
              data-testid="switch-internet-facing"
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
            <Typography variant="h6" sx={{ mt: 5 }}>
              {Messages.sourceRange}
            </Typography>
            <Controller
              control={control}
              name="sourceRange"
              rules={{
                required: true,
                pattern: IP_RANGE_PATTERN,
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
                        <IconButton
                          data-testid="delete-button"
                          onClick={() =>
                            setValue('sourceRange', '', {
                              shouldValidate: true,
                            })
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  // eslint-disable-next-line react/jsx-no-duplicate-props
                  inputProps={{
                    'data-testid': 'text-source-range',
                  }}
                />
              )}
            />
          </>
        )}
      </FormGroup>
    </>
  );
};
