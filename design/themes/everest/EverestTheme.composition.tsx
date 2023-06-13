import React from 'react';
import { PaletteThemeViewer } from '@percona/design.utils.palette-theme-viewer';

import {
  Button as MuiButton,
  ButtonGroup as MuiButtonGroup,
  IconButton as MuiIconButton,
  Box,
} from '@mui/material';
import { Cached } from '@mui/icons-material';
import { CompositionViewer } from '@percona/design.composition-viewer';
import { everestThemeOptions } from './EverestTheme';

export const Palette = () => (
  <PaletteThemeViewer themeOptions={everestThemeOptions} />
);

const buttonsLine = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
};
export const Buttons = () => (
  <CompositionViewer themeOptions={everestThemeOptions}>
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.default',
        display: 'grid',
        gap: 1,
      }}
    >
      <Box sx={buttonsLine}>
        <MuiButton variant="contained" size="large">
          Large
        </MuiButton>
        <MuiButton variant="contained" size="large" disabled>
          Large
        </MuiButton>
        <MuiButton variant="contained" size="medium">
          Medium
        </MuiButton>
        <MuiButton variant="contained" size="medium" disabled>
          Medium
        </MuiButton>
        <MuiButton variant="contained" size="small">
          Small
        </MuiButton>
        <MuiButton variant="contained" size="small" disabled>
          Small
        </MuiButton>
      </Box>
      <Box sx={buttonsLine}>
        <MuiButton variant="outlined" size="large">
          Large
        </MuiButton>
        <MuiButton variant="outlined" size="large" disabled>
          Large
        </MuiButton>
        <MuiButton variant="outlined" size="medium">
          Medium
        </MuiButton>
        <MuiButton variant="outlined" size="medium" disabled>
          Medium
        </MuiButton>
        <MuiButton variant="outlined" size="small">
          Small
        </MuiButton>
        <MuiButton variant="outlined" size="small" disabled>
          Small
        </MuiButton>
      </Box>
      <Box sx={buttonsLine}>
        <MuiButton variant="text" size="large">
          Large
        </MuiButton>
        <MuiButton variant="text" size="large" disabled>
          Large
        </MuiButton>
        <MuiButton variant="text" size="medium">
          Medium
        </MuiButton>
        <MuiButton variant="text" size="medium" disabled>
          Medium
        </MuiButton>
        <MuiButton variant="text" size="small">
          Small
        </MuiButton>
        <MuiButton variant="text" size="small" disabled>
          Small
        </MuiButton>
      </Box>
      <Box sx={buttonsLine}>
        <MuiButtonGroup variant="contained" size="medium">
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
        </MuiButtonGroup>
        <MuiButtonGroup variant="contained" size="medium">
          <MuiButton>Medium</MuiButton>
          <MuiButton>
            <Cached />
          </MuiButton>
        </MuiButtonGroup>
      </Box>
      <Box sx={buttonsLine}>
        <MuiButtonGroup variant="outlined" size="medium">
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
          <MuiButton>Medium</MuiButton>
        </MuiButtonGroup>
        <MuiButtonGroup variant="outlined" size="medium">
          <MuiButton>Medium</MuiButton>
          <MuiButton>
            <Cached />
          </MuiButton>
        </MuiButtonGroup>
      </Box>
      <Box sx={buttonsLine}>
        <MuiIconButton size="large">
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="large" disabled>
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="medium">
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="medium" disabled>
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="small">
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="small" disabled>
          <Cached />
        </MuiIconButton>
      </Box>
      <Box sx={buttonsLine}>
        <MuiIconButton size="large" color="primary">
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="large" disabled>
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="medium" color="primary">
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="medium" disabled>
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="small" color="primary">
          <Cached />
        </MuiIconButton>
        <MuiIconButton size="small" disabled>
          <Cached />
        </MuiIconButton>
      </Box>
    </Box>
  </CompositionViewer>
);
