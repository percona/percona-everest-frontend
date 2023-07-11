import React from 'react';
import { Stack, Typography } from "@mui/material";
import { PreviewContentTextProps, PreviewSectionProps } from './database-preview.types';

export const PreviewSection = ({
  title,
  order,
  children,
  hasBeenReached = false,
  active = false,
  sx,
  ...stackProps
}: PreviewSectionProps) => (
  <Stack
    sx={{
      pl: 3,
      pt: 1,
      pb: 1,
      pr: 1,
      ...(!hasBeenReached && !active && {
        pt: 0,
        pb: 0,
      }),
      ...(active && {
        backgroundColor: 'action.hover',
      }),
      ...sx,
    }}
    {...stackProps}
  >
    <Typography
      variant={hasBeenReached ? 'sectionHeading' : 'caption'}
      color={hasBeenReached ? 'text.primary' : 'text.disabled'}
      sx={{
        '&::before': {
          content: `"${order}. "`,
          ml: -2,
        }
      }}
    >
      {title}
    </Typography>
    {hasBeenReached && children}
  </Stack>
);

export const PreviewContentText = ({ text }: PreviewContentTextProps) => (
  <Typography variant='caption' color='text.secondary'>{text}</Typography>
)