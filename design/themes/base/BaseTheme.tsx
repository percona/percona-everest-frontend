import { PaletteMode } from '@mui/material';
import { ThemeOptions, createTheme } from '@mui/material';

let BaseTheme = createTheme();

const themeOptions = (mode: PaletteMode): ThemeOptions => ({
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
          light: '#F0B336',
          main: '#D8A02C',
          dark: '#AA7F26',
          contrastText: '#000000',
        },
        info: {
          light: '#CE3C3C',
          main: '#BA1A1A',
          dark: '#9F0000',
          contrastText: '#FFFFFF',
        },
        success: {
          light: '#127AE8',
          main: '#0E5FB5',
          dark: '#0B4A8C',
          contrastText: '#FFFFFF',
        },
        text: {
          primary: '#303642',
          secondary: 'rgba(48, 54, 66, 0.75)',
          disabled: 'rgba(48, 54, 66, 0.5)',
        },
      } : {
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
          main: '#59DAC1',
          dark: '#2CBEA2',
          contrastText: '#0B322A',
        },
        text: {
          primary: '#FFFFFF',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.4)',
        },
      })
  },
  typography: {
    h1: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '32px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '48px',
      }
    },
    h2: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '29px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '40px',
      }
    },
    h3: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '26px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '33px',
      }
    },
    h4: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '23px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '28px',
      }
    },
    h5: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '20px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '23px',
      }
    },
    h6: {
      fontWeight: 600,
      [BaseTheme.breakpoints.down('sm')]: {
        fontSize: '18px',
      },
      [BaseTheme.breakpoints.up('sm')]: {
        fontSize: '19px',
      }
    }
  }
});

export const getTheme = (mode: PaletteMode = 'light') => createTheme(BaseTheme, themeOptions(mode))

