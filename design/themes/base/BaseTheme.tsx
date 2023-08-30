import { createTheme, PaletteMode, ThemeOptions } from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeAction {
    focusVisible: string;
    focusVisibleOpacity: number;
    outlinedBorder: string;
    outlinedBorderOpacity: number;
  }
  interface TypographyVariants {
    sectionHeading: React.CSSProperties;
    subHead: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    sectionHeading: React.CSSProperties;
    subHead: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    sectionHeading: true;
    subHead: true;
  }
}

const BaseTheme = createTheme();

export const baseThemeOptions = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          error: {
            light: '#CE3C3C',
            main: '#BA1A1A',
            dark: '#9F0000',
            contrastText: '#FFFFFF',
          },
          warning: {
            main: '#FFF2B2',
            contrastText: '#856E00',
          },
          info: {
            light: '#127AE8',
            main: '#0E5FB5',
            dark: '#0B4A8C',
            contrastText: '#FFFFFF',
          },
          success: {
            light: '#127AE8',
            main: 'rgba(231, 246, 241, 1)',
            dark: '#0B4A8C',
            contrastText: '#00745B',
          },
          text: {
            primary: '#303642',
            secondary: 'rgba(48, 54, 66, 0.75)',
            disabled: 'rgba(48, 54, 66, 0.5)',
          },
          action: {
            hover: 'rgba(44, 50, 62, 0.04)',
            hoverOpacity: 0.04,
            disabled: 'rgba(44, 50, 62, 0.12)',
            disabledOpacity: 0.12,
            focus: 'rgba(44, 50, 62, 0.12)',
            focusOpacity: 0.12,
          },
          background: {
            default: '#FFFFFF',
            paper: '#FFFFFF',
          },
        }
      : {
          error: {
            light: '#FFCCC5',
            main: '#FFB4AB',
            dark: '#F7948C',
            contrastText: '#522625',
          },
          warning: {
            light: '#FAE7C1',
            main: '#F5CC78',
            dark: '#E1B252',
            contrastText: '#42361D',
          },
          info: {
            light: '#B6D9FF',
            main: '#93C7FF',
            dark: '#62AEFF',
            contrastText: '#0C335D',
          },
          success: {
            light: '#A0EADC',
            main: '#00745B',
            dark: '#2CBEA2',
            contrastText: '#FFFFFF',
          },
          text: {
            primary: '#FFFFFF',
            secondary: 'rgba(255, 255, 255, 0.7)',
            disabled: 'rgba(255, 255, 255, 0.4)',
          },
          action: {
            hover: 'rgba(240, 241, 244, 0.06)',
            hoverOpacity: 0.06,
            disabled: 'rgba(240, 241, 244, 0.14)',
            disabledOpacity: 0.14,
            focus: 'rgba(240, 241, 244, 0.14)',
            focusOpacity: 0.14,
          },
          background: {
            default: '#2C323E',
            paper: '#2C323E',
          },
        }),
  },
  typography: {
    h1: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '32px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '48px',
      },
    },
    h2: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '29px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '40px',
      },
    },
    h3: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '26px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '33px',
      },
    },
    h4: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '23px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '28px',
      },
    },
    h5: {
      fontWeight: 600,
      lineHeight: '22.5px',
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '23px',
      },
    },
    h6: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '18px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '19px',
      },
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: '19px',
      lineHeight: '1',
    },
    subtitle2: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '22px',
    },
    overline: {
      fontWeight: 800,
      fontSize: '12px',
    },
    sectionHeading: {
      fontWeight: 700,
      fontSize: '14px',
      lineHeight: '17.5px',
    },
    subHead: {
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '22px',
    },
    body1: {
      fontWeight: 400,
      fontSize: '16px',
    },
    body2: {
      fontWeight: 400,
      fontSize: '14px',
    },
    caption: {
      fontWeight: 400,
      fontSize: '13px',
    },
    button: {
      textTransform: 'none',
      lineHeight: '1',
      letterSpacing: '0.025em',
    },
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)',
    '0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px 0px rgba(0, 0, 0, 0.14), 0px 1px 8px 0px rgba(0, 0, 0, 0.12)',
    '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12)',
    '0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12)',
    '0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12)',
    '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
    '0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12)',
    '0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12)',
    '0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12)',
    '0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)',
    '0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12)',
    '0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12)',
    '0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)',
    '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
    '0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12)',
    '0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12)',
    '0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12)',
    '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)',
    '0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12)',
    '0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12)',
    '0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12)',
    '0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)',
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          fontWeight: 400,
          maxWidth: '100%',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          borderRadius: 128,
          borderWidth: 2,

          '& > svg': {
            width: 20,
            height: 20,
            margin: -3,
          },

          ...(ownerState.variant === 'contained' && {
            ...(ownerState.size === 'large' && {
              padding: '13px 24px',
            }),
            ...(ownerState.size === 'medium' && {
              padding: '11px 16px',
            }),
            ...(ownerState.size === 'small' && {
              padding: '8px 12px',
            }),
          }),

          ...(ownerState.variant === 'outlined' && {
            ...(ownerState.size === 'large' && {
              padding: '11px 22px',
            }),
            ...(ownerState.size === 'medium' && {
              padding: '9px 14px',
            }),
            ...(ownerState.size === 'small' && {
              padding: '6px 10px',
            }),
            borderColor: theme.palette.primary.main,
          }),

          ...(ownerState.size === 'large' && {
            fontSize: 16,
          }),
          ...(ownerState.size === 'medium' && {
            fontSize: 16,
          }),
          ...(ownerState.size === 'small' && {
            fontSize: 14,
          }),

          '&:hover': {
            borderWidth: '2px',
            ...(ownerState.variant === 'outlined' && {
              backgroundColor: theme.palette.action.focus,
            }),
            ...(ownerState.variant === 'text' && {
              backgroundColor: theme.palette.action.focus,
            }),
          },
          '&:disabled': {
            borderWidth: '2px',
            ...(ownerState.variant === 'contained' && {
              backgroundColor: theme.palette.action.disabled,
            }),
            color: theme.palette.text.disabled,
          },
        }),
      },
    },
    MuiButtonGroup: {
      styleOverrides: {
        root: {
          borderRadius: '128px',
        },
        grouped: ({ ownerState }) => ({
          '&:not(:last-of-type)': {
            ...(ownerState.variant === 'contained' && {
              borderRight: 0,
            }),
            marginLeft: '-2px',
          },
          '&:not(:first-of-type)': {
            marginLeft: '-2px',
          },
        }),
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          fontWeight: 400,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '12px',
          fontWeight: 400,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: '32px',
          '.MuiButtonBase-root': {
            fontSize: '16px',
            padding: '8px 12px',
          },
          '.MuiTabs-indicator': {
            height: '3px',
          },
          '.MuiTabScrollButton-root': {
            '&.Mui-disabled': {
              opacity: 0.1,
            },
          },
        },
      },
    },
    MuiDialogTitle: {
      defaultProps: {
        component: 'h5',
        variant: 'h5',
      },
      styleOverrides: {
        root: {
          padding: BaseTheme.spacing(2),
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: BaseTheme.spacing(2),
          paddingTop: `${BaseTheme.spacing(2)} !important`,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: BaseTheme.spacing(2),
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          alignItems: 'flex-start',
          '.MuiFormControlLabel-label': {
            paddingTop: '6px',
          },
        },
      },
    },
  },
});
