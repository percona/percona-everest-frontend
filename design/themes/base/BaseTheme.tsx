import { ThemeOptions, createTheme } from '@mui/material';

let BaseTheme = createTheme();

const themeOptions: ThemeOptions = {
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
  },
};

BaseTheme = createTheme(BaseTheme, themeOptions);

export { BaseTheme };
