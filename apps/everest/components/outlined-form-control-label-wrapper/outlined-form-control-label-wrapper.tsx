import React from 'react';
import { useTheme, Box, useMediaQuery } from '@mui/material';
import { FormControlLabelWrapperProps } from './outlined-form-control-label-wrapper.types';
import { FormControlLabel } from '../form-control-label/form-control-label';

export const OutlinedFormControlLabelWrapper = ({
  children,
  boxSx,
  ...props
}: FormControlLabelWrapperProps) => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return children ? (
    <Box
      sx={{
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: theme.palette.divider,
        borderRadius: '4px',
        display: 'flex',
        p: 2,
        flex: '1 1 auto',
        flexDirection: 'row',
        ...(isLaptop && {
          flexWrap: 'wrap',
        }),
        ...boxSx,
      }}
    >
      <FormControlLabel
        sx={{ ...(isLaptop && { pb: 2 }) }}
        sxLabel={{
          ...(isLaptop && { minWidth: '320px' }),
          ...(isMobile && { minWidth: 'none' }),
        }}
        {...props}
      />
      {children}
    </Box>
  ) : (
    <Box sx={{ ...boxSx }}>
      <FormControlLabel outlined={true} {...props} />
    </Box>
  );
};
