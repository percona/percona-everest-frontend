import React from 'react';
import { useTheme, Box, useMediaQuery } from '@mui/material';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { kebabize } from '@percona/utils.string';
import { SwitchOutlinedBoxProps } from './switch-outlined-box.types';

const switchOutlinedBoxStyles = (theme) => ({
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: theme.palette.divider,
  borderRadius: '4px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: 2,
  p: 2,
  mt: 2,
});
export const SwitchOutlinedBox = ({
  control,
  controllerProps,
  formControlLabelProps,
  name,
  label,
  labelCaption,
  children,
  rootSx,
  childrenSx,
}: SwitchOutlinedBoxProps) => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return children ? (
    <Box
      sx={{
        ...switchOutlinedBoxStyles(theme),
        ...(isLaptop && {
          flexWrap: 'wrap',
        }),
        ...rootSx,
      }}
      data-testid={`switch-outlined-box-${name}`}
    >
      <SwitchInput
        control={control}
        name={name}
        label={label}
        labelCaption={labelCaption}
        controllerProps={controllerProps}
        formControlLabelProps={{
          sx: {
            ...(isLaptop && { minWidth: '320px' }),
            ...(isMobile && { minWidth: 'none' }),
          },
          ...formControlLabelProps,
        }}
      />
      <Box
        data-testid={`${kebabize(name)}-switch-outlined-child-box`}
        sx={{ alignSelf: 'center', ...childrenSx }}
      >
        {children}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{ ...switchOutlinedBoxStyles(theme), ...rootSx }}
      data-testid={`${kebabize(name)}-switch-outlined-box`}
    >
      <SwitchInput
        control={control}
        name={name}
        label={label}
        labelCaption={labelCaption}
        controllerProps={controllerProps}
        formControlLabelProps={formControlLabelProps}
      />
    </Box>
  );
};
