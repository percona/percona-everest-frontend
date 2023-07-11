import React from 'react';
import { Typography } from '@mui/material';
import { LabeledContentProps } from './labeled-content.types';

export const LabeledContent = ({ label, children, sx, ...typographyProps }: LabeledContentProps) => (
  <>
    {/* @ts-ignore */}
    <Typography variant="sectionHeading" sx={{ mt: 4, mb: 0.5, ...sx }} {...typographyProps}>
      {label}
    </Typography>
    {children}
  </>
);
