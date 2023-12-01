import { TextInput } from '@percona/ui-lib';
import { Box, InputAdornment, Typography, useTheme } from '@mui/material';
import { ResourceInputProps } from './resource-input.types';
import { useActiveBreakpoint } from '../../../../../hooks/utils/useActiveBreakpoint.ts';
import { useFormContext } from 'react-hook-form';

export const ResourceInput = ({
  name,
  label,
  helperText,
  endSuffix,
  numberOfNodes,
}: ResourceInputProps) => {
  const { isDesktop } = useActiveBreakpoint();
  const theme = useTheme();
  const { watch } = useFormContext();
  const value: number = watch(name);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <TextInput
        name={name}
        textFieldProps={{
          variant: 'outlined',
          label,
          helperText,
          InputProps: {
            endAdornment: (
              <InputAdornment position="end">{endSuffix}</InputAdornment>
            ),
          },
          InputLabelProps: {
            shrink: true,
          },
        }}
      />
      {isDesktop && numberOfNodes && (
        <Box sx={{ ml: 1, pt: 0.5, flexBasis: 'fit-content' }}>
          <Typography
            variant="caption"
            sx={{ whiteSpace: 'nowrap' }}
            color={theme.palette.text.secondary}
          >{`x ${numberOfNodes} node${
            +numberOfNodes > 1 ? 's' : ''
          }`}</Typography>
          {value && numberOfNodes && (
            <Typography
              variant="body1"
              sx={{ whiteSpace: 'nowrap' }}
              color={theme.palette.text.secondary}
            >{` = ${value * numberOfNodes} ${endSuffix}`}</Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
