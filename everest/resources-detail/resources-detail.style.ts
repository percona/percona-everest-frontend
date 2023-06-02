import { css } from '@emotion/css';
import { Theme } from '@mui/material';

export const getStyles = (theme: Theme) => ({
  wrapper: css`
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
    justify-content: center;
  `,
  label: css`
    min-width: 100px;
    color: ${theme.palette.text.primary};
  `,
  input: css`
    max-width: 150px;
  `,
});
