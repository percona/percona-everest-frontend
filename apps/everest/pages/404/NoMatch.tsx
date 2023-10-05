import '@fontsource/poppins';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { NoMatchIcon } from './icon/NoMatchIcon';

export const NoMatch = () => {
  return (
    <Box
      sx={{
        height: '435px',
        width: '980px',
        mt: '150px',
        mx: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ h: '435px', w: '435px' }}>
        <NoMatchIcon />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: '40px',
            lineHeight: '40px',
            letterSpacing: '-0.025em',
            fontFamily: 'Poppins',
          }}
        >
          Sorry, we can't seem to find what you are looking for.
        </Typography>
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: '16px',
            lineHeight: '19.44px',
            letterSpacing: '-0.025em',
            fontFamily: 'Poppins',
          }}
        >
          The web address you entered seems to be invalid. It could have been
          renamed or removed, or there could be broken links.
        </Typography>
        <Button
          component={Link}
          to="/"
          sx={{ alignSelf: 'start', mt: 2 }}
          variant="contained"
        >
          Go back to homepage
        </Button>
      </Box>
    </Box>
  );
};
