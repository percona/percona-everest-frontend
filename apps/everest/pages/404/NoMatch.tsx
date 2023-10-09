import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { NoMatchIcon } from './icon/NoMatchIcon';
import { Messages } from './NoMatch.messages';

export const NoMatch = () => {
  const theme = useTheme();
  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        height: isLaptop ? 'auto' : '435px',
        width: isLaptop ? 'auto' : '980px',
        mt: isLaptop ? (isMobile ? '13px' : '58px') : '150px',
        mx: isLaptop ? (isMobile ? '13px' : '58px') : 'auto',
        display: 'flex',
        flexDirection: isLaptop ? 'column' : 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <NoMatchIcon
        w={isMobile ? '300px' : '435px'}
        h={isMobile ? '300px' : '435px'}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '40px',
            lineHeight: '40px',
            letterSpacing: '-0.025em',
            fontFamily:
              '"Poppins", "Roboto", "Helvetica", "Arial", "sans-serif"',
          }}
        >
          {Messages.header}
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19.44px',
            letterSpacing: '-0.025em',
            fontFamily:
              '"Poppins", "Roboto", "Helvetica", "Arial", "sans-serif"',
          }}
        >
          {Messages.subHeader}
        </Typography>
        <Button
          component={Link}
          to="/"
          sx={{ alignSelf: 'start', mt: 2 }}
          variant="contained"
        >
          {Messages.redirectButton}
        </Button>
      </Box>
    </Box>
  );
};
