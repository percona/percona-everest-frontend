import React from 'react';
import {
  FormControlLabel as MuiFormControlLabel,
  useTheme,
} from '@mui/material';
import { FormControlLabelProps } from './form-control-label.types';
import { Label } from './label/label';
export const FormControlLabel = ({
  labelHeader,
  labelMessage,
  label,
  outlined,
  sx,
  sxLabel,
  ...props
}: FormControlLabelProps) => {
  const theme = useTheme();

  return (
    <MuiFormControlLabel
      label={
        label ? (
          label
        ) : labelHeader || labelMessage ? (
          <Label
            sx={sxLabel}
            labelHeader={labelHeader}
            labelMessage={labelMessage}
          />
        ) : (
          <></>
        )
      }
      sx={{
        alignItems: 'flex-start',
        marginLeft: 0,
        ...(outlined && {
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: theme.palette.divider,
          borderRadius: '4px',
          p: 2,
        }),
        mr: 0,
        display: 'flex',
        flex: '1 1 auto',
        ...sx,
      }}
      {...props}
    />
  );
};
