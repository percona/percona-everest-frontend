import React, { Fragment } from 'react';
import {
  useTheme,
  Stepper as MuiStepper,
  StepperProps as MuiStepperProps,
} from '@mui/material';

export type StepperProps = MuiStepperProps & {
  noConnector?: boolean;
  dataTestId?: string;
};

export const Stepper = ({
  noConnector,
  connector,
  dataTestId,
  ...props
}: StepperProps) => {
  const theme = useTheme();

  return (
    <MuiStepper
      data-testid={`${dataTestId || ''}-stepper`}
      sx={{
        ...(noConnector && {
          '.MuiStep-root': {
            padding: 0,
          },
        }),
        '.MuiStepIcon-root.Mui-active': {
          color: theme.palette.text.primary,
        },
        '.MuiStepIcon-root.Mui-completed': {
          color: theme.palette.primary.light,
        },
        '.MuiStepLabel-label': {
          fontWeight: 600,
        },
        '.MuiStepLabel-label.Mui-active': {
          color: theme.palette.text.primary,
        },
        '.MuiStepLabel-label.Mui-completed': {
          color: theme.palette.text.secondary,
        },
      }}
      {...props}
      connector={noConnector ? <Fragment /> : connector}
    />
  );
};
