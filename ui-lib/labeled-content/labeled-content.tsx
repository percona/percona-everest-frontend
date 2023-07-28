import { Typography } from '@mui/material';
import React from 'react';
import { LabeledContentProps } from './labeled-content.types';

export const LabeledContent = ({
  label,
  children,
  isRequired = false,
  sx,
  ...typographyProps
}: LabeledContentProps) => (
  <>
    <Typography
      // @ts-ignore
      variant="sectionHeading"
      sx={{ mt: 4, mb: 0.5, ...sx }}
      {...typographyProps}
    >
      {label}
      {isRequired && <span>*</span>}
    </Typography>
    {children}
  </>
);
