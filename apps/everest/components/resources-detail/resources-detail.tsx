import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Input } from '@percona/ui-lib.input';
import { ProgressBar } from '@percona/ui-lib.progress-bar';
import React from 'react';
import { ResourcesDetailProps } from './resources-detail.types';

export function ResourcesDetail({
  label,
  labelProgressBar,
  units,
  value,
  total,
  inputValue,
  setInputValue,
  dataTestId,
}: ResourcesDetailProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const labelProcessBarDefault = `Using ${inputValue} ${units} (${Math.floor(
    (inputValue / total) * 100
  )}%) of\n ${total} ${units} in total`;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: '10px',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      data-testid={`${dataTestId}-resource-box`}
    >
      <Box
        sx={{
          minWidth: isMobile ? '70px' : '100px',
          color: 'text.primary',
          fontWeight: '800',
          fontSize: '14px',
        }}
      >
        {label}
      </Box>
      <Box sx={{ maxWidth: '150px', minWidth: '100px' }}>
        <Input
          value={inputValue}
          setValue={setInputValue}
          units={units}
          data-testid={`${dataTestId}-input`}
        />
      </Box>
      {isMobile ? (
        <Box
          sx={{
            fontSize: '12px',
            minWidth: '120px',
            wordWrap: 'break-word',
            whiteSpace: 'pre-wrap',
            textAlign: 'end',
          }}
        >
          {labelProgressBar ? labelProgressBar : labelProcessBarDefault}
        </Box>
      ) : (
        <ProgressBar
          dataTestId={`${dataTestId}-progress-bar`}
          label={labelProgressBar ? labelProgressBar : labelProcessBarDefault}
          buffer={inputValue}
          value={value}
          total={total}
        />
      )}
    </Box>
  );
}
