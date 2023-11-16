import { AlertColor, Theme } from '@mui/material';

export const getFontColorForAlertSeverity = (
  severity: AlertColor = 'success',
  theme: Theme
): string => theme.palette[severity].contrastText;

export const getBorderColorForAlertSeverity = (
  severity: AlertColor = 'success',
  { palette: { mode } }: Theme
): string => {
  // These are PEAK's "outlineBorder" color. Since they are not used elsewhere, they live here
  switch (severity) {
    case 'success':
      return mode === 'light' ? 'rgba(0, 116, 91, 0.20)' : '#00745B';
    case 'info':
      return mode === 'light' ? 'rgba(0, 86, 203, 0.20)' : '#0070E5';
    case 'warning':
      return mode === 'light' ? 'rgba(133, 110, 0, 0.20)' : '#F5CC00';
    case 'error':
      return mode === 'light' ? 'rgba(177, 8, 16, 0.20)' : '#CC352E';
  }
};

export const getBackgroundColorForAlertSeverity = (
  severity: AlertColor = 'success',
  theme: Theme
): string => theme.palette[severity].main;
