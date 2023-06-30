import React from 'react';
import { Stack, Typography } from "@mui/material";
import { PreviewContentTextProps, PreviewSectionProps } from './database-preview.types';

export const PreviewSection = ({ title, children, active = false, sx, ...stackProps }: PreviewSectionProps) => (
  <Stack sx={{ mt: active ? 1.5 : 0, ...sx }} {...stackProps}>
    <Typography fontWeight='bold' fontSize='12px' color={active ? 'text.primary' : 'text.secondary'}>{title}</Typography>
    {active && children}
  </Stack>
);

export const PreviewContentText = ({ text }: PreviewContentTextProps) => (
  <Typography fontSize='13px' color='text.secondary'>{text}</Typography>
)