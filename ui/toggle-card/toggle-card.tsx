import React, { ReactNode } from 'react';
import { ToggleButton, ToggleButtonProps, useTheme } from '@mui/material';

export type ToggleCardProps = {
  children?: ReactNode;
} & ToggleButtonProps;

export const ToggleCard = ({ children, sx, ...props }: ToggleCardProps) => {
  const theme = useTheme();

  return (
    <ToggleButton
      disableRipple
      sx={{
        backgroundColor: 'background.default',
        boxShadow: 4,
        color: 'black',
        textTransform: 'none',
        border: 'none',
        ':hover, &.Mui-selected:hover': {
          backgroundColor: 'action.hover',
        },
        '&.Mui-selected': {
          outlineStyle: 'solid',
          outlineWidth: '2px',
          outlineColor: theme.palette.action.outlinedBorder,
          backgroundColor: 'background.default',
        },
        '&.MuiToggleButtonGroup-grouped': {
          '&:not(:last-of-type)': {
            borderTopRightRadius: `${theme.shape.borderRadius}px`,
            borderBottomRightRadius: `${theme.shape.borderRadius}px`,

            [theme.breakpoints.down('sm')]: {
              mb: 1,
            },
            [theme.breakpoints.up('sm')]: {
              mr: 1,
            },
          },
          '&:not(:first-of-type)': {
            borderTopLeftRadius: `${theme.shape.borderRadius}px`,
            borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
          },
        },
          '&.MuiButtonBase-root': {
              wordWrap: 'break-word',
              whiteSpace: 'pre-wrap',
          },
          ...sx,
      }}
      {...props}
    >
      {children}
    </ToggleButton>
  );
};
