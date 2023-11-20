import { Box, useTheme, Theme } from '@mui/material';
import { SwitchInput } from '@percona/ui-lib';
import { kebabize } from '@percona/utils';
import { useActiveBreakpoint } from 'hooks/utils/useActiveBreakpoint';
import { SwitchOutlinedBoxProps } from './switch-outlined-box.types';

const switchOutlinedBoxStyles = (theme: Theme) => ({
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
  const { isTablet, isMobile } = useActiveBreakpoint();

  return children ? (
    <Box
      sx={{
        ...switchOutlinedBoxStyles(theme),
        ...(isTablet && {
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
            ...(isTablet && { minWidth: '320px' }),
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
