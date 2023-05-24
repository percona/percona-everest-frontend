import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface TypeAction {
    focusVisible: string;
    focusVisibleOpacity: number;
    outlinedBorder: string;
    outlinedBorderOpacity: number;
  }
}
