import React, { useState } from 'react';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { Box, ToggleButtonGroup } from '@mui/material';
import { ToggleCard } from './toggle-card';

export const Single = () => {
  const [selected, setSelected] = useState(false);

  return (
    <ThemeContextProvider themeOptions={everestThemeOptions}>
      <Box sx={{ padding: 1 }}>
        <ToggleCard
          value="single"
          selected={selected}
          onChange={() => setSelected((value) => !value)}
        >
          Single Toggle
        </ToggleCard>
      </Box>
    </ThemeContextProvider>
  );
};

export const Group = () => {
  const [number, setNumber] = useState('two');

  const handleNumberChange = (_, newNumber: string | null) => {
    if (newNumber !== null) {
      setNumber(newNumber);
    }
  };

  return (
    <ThemeContextProvider themeOptions={everestThemeOptions}>
      <ToggleButtonGroup
        fullWidth
        exclusive
        sx={{ padding: 1 }}
        value={number}
        onChange={handleNumberChange}
      >
        <ToggleCard value="one">One</ToggleCard>
        <ToggleCard value="two">Two</ToggleCard>
        <ToggleCard value="three">Three</ToggleCard>
      </ToggleButtonGroup>
    </ThemeContextProvider>
  );
};
