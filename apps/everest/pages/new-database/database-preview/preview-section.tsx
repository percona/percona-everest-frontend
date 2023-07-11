import React from 'react';
import { Stack, Typography } from "@mui/material";
import { PreviewContentTextProps, PreviewSectionProps } from './database-preview.types';

export const PreviewSection = ({ title, children, active = false, sx, ...stackProps }: PreviewSectionProps) => (
  <Stack
    sx={{
      padding: 1,
      ...(active && {
        mt: 1.5,
        backgroundColor: 'action.hover',
        pl: 3,
      }),
      ...sx,
    }}
    {...stackProps}
  >
    <Typography
      variant='sectionHeading'
      color={active ? 'text.primary' : 'text.disabled'}
    >
      {title}
    </Typography>
    {active && children}
  </Stack>
);

export const PreviewContentText = ({ text }: PreviewContentTextProps) => (
  <Typography variant='caption' color='text.secondary'>{text}</Typography>
)