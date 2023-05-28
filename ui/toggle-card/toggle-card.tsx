import React, { ReactNode } from 'react';
import { ToggleButton, ToggleButtonProps, useTheme } from '@mui/material';

export type ToggleCardProps = {
  /**
   * a node to be rendered in the special component.
   */
  children?: ReactNode;
} & ToggleButtonProps;

export const ToggleCard = ({ children, ...props }: ToggleCardProps) => {
  const theme = useTheme();

  return (
    <ToggleButton
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
          mr: 1,
          '&:not(:last-of-type)': {
            borderTopRightRadius: `${theme.shape.borderRadius}px`,
            borderBottomRightRadius: `${theme.shape.borderRadius}px`,
          },
          '&:not(:first-of-type)': {
            borderTopLeftRadius: `${theme.shape.borderRadius}px`,
            borderBottomLeftRadius: `${theme.shape.borderRadius}px`,
          },
        },
      }}
      {...props}
    >
      {children}
    </ToggleButton>
  );
};
