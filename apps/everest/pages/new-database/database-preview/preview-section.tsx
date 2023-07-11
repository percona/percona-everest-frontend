import React from 'react';
import { IconButton, Stack, Typography } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { PreviewContentTextProps, PreviewSectionProps } from './database-preview.types';

export const PreviewSection = ({
  title,
  order,
  children,
  hasBeenReached = false,
  active = false,
  sx,
  ...stackProps
}: PreviewSectionProps) => {
  const showEdit = !active && hasBeenReached;

  return (
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
        // @ts-ignore 
        variant={hasBeenReached ? 'sectionHeading' : 'caption'}
        color={hasBeenReached ? 'text.primary' : 'text.disabled'}
        sx={{
          position: 'relative',
          '&::before': {
            content: `"${order}. "`,
            ml: -2,
          },
        }}
      >
        {title}
        {showEdit && (
          <IconButton
            // Absolute position to avoid the button's padding from interfering with the spacing
            sx={{
              position: 'absolute',
              top: (theme) => theme.spacing(-1)
            }}
          >
            <EditOutlinedIcon
              fontSize='small'
              color='primary'
              sx={{
                verticalAlign: 'text-bottom',
              }}
            />
          </IconButton>
        )}
      </Typography>
      {hasBeenReached && children}
    </Stack>
  );
};

export const PreviewContentText = ({ text }: PreviewContentTextProps) => (
  <Typography variant='caption' color='text.secondary'>{text}</Typography>
)