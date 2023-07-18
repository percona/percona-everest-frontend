import React from 'react';
import { IconButton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { PreviewContentTextProps, PreviewSectionProps } from './database-preview.types';

export const PreviewSection = ({
  title,
  order,
  onEditClick,
  children,
  hasBeenReached = false,
  active = false,
  sx,
  ...stackProps
}: PreviewSectionProps) => {
  const theme = useTheme();
  const showEdit = !active && hasBeenReached;
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Stack
      data-testid={`section-${order}`}
      sx={{
        pl: 3,
        pt: 1,
        pb: 1,
        pr: 1,
        ...(!hasBeenReached && !active && {
          pt: 0,
          pb: 0,
        }),
        ...(active && isDesktop && {
          backgroundColor: 'action.hover',
          mb: 1.5,
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
          ml: -2,
        }}
      >
        {`${order}. ${title}`}
        {showEdit && (
          <IconButton
            // Absolute position to avoid the button's padding from interfering with the spacing
            sx={{
              position: 'absolute',
              top: theme.spacing(-1)
            }}
            onClick={onEditClick}
          >
            <EditOutlinedIcon
              fontSize='small'
              color='primary'
              sx={{
                verticalAlign: 'text-bottom',
              }}
              data-testid={`edit-section-${order}`}
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