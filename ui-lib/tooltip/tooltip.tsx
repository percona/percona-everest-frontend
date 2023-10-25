import { Tooltip as TooltipMui, TooltipProps } from '@mui/material';
import { tooltipClasses } from '@mui/material/Tooltip';
import React from 'react';

export function Tooltip({ children, ...props }: TooltipProps) {
  return (
    <TooltipMui
      placement="right"
      arrow
      PopperProps={{
        sx: {
          [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: 'yellow',
            color: 'red',
          },
          [`& .${tooltipClasses.arrow}`]: {
            color: 'red',
            backgroundColor: 'yellow',
          },
        },
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, -5],
            },
          },
        ],
      }}
      {...props}
    >
      {children}
    </TooltipMui>
  );
}
