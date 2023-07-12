import React from 'react';
import { useTheme, Box, useMediaQuery } from '@mui/material';
import { SwitchInput } from '@percona/ui-lib.form.inputs.switch';
import { kebabize } from '@percona/utils.string';
import { SwitchOutlinedBoxProps } from './switch-outlined-box.types';
import { Label } from './label/label';

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
  labelHeader,
  labelDescription,
  children,
  switchOutlinedBoxSx,
  switchOutlinedBoxChildrenSx,
}: SwitchOutlinedBoxProps) => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const labelComponent =
    label ||
    (labelHeader || labelDescription ? (
      <Label labelHeader={labelHeader} labelDescription={labelDescription} />
    ) : (
      <></>
    ));

  return children ? (
    <Box
      sx={{
        ...switchOutlinedBoxStyles(theme),
        ...(isLaptop && {
          flexWrap: 'wrap',
        }),
        ...switchOutlinedBoxSx,
      }}
      data-testid={`${name}-switch-outlined-box`}
    >
      <SwitchInput
        control={control}
        name={name}
        label={labelComponent}
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
        sx={{ ...switchOutlinedBoxChildrenSx }}
      >
        {children}
      </Box>
    </Box>
  ) : (
    <Box
      sx={{ ...switchOutlinedBoxStyles(theme), ...switchOutlinedBoxSx }}
      data-testid={`${kebabize(name)}-switch-outlined-box`}
    >
      <SwitchInput
        control={control}
        name={name}
        label={labelComponent}
        controllerProps={controllerProps}
        formControlLabelProps={formControlLabelProps}
      />
    </Box>
  );
};
