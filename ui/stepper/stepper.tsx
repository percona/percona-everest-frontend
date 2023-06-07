import React, { Fragment } from 'react';
import { Stepper as MuiStepper, useTheme } from '@mui/material';
import { StepperProps as MuiStepperProps } from '@mui/material/Stepper/Stepper';

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
      data-testid={dataTestId}
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
        '.MuiStepLabel-label.Mui-active': {
          color: theme.palette.text.primary,
          fontWeight: 600,
        },
        '.MuiStepLabel-label.Mui-completed': {
          color: theme.palette.text.secondary,
          fontWeight: 600,
        },
        '.MuiStepLabel-label': {
          fontWeight: 600,
        },
      }}
      {...props}
      connector={noConnector ? <Fragment /> : connector}
    />
  );
};
