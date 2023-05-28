import React from 'react';
import { ToggleCard } from './toggle-card';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { Box, Stack, ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import { MongoIcon, MySqlIcon, PostgreSqlIcon } from '@percona/ui.icons.db';
import { Typography } from '@mui/material';

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
  const [db, setDb] = useState('postgresql');

  const handleNumberChange = (_, newNumber: string | null) => {
    if (newNumber !== null) {
      setNumber(newNumber);
    }
  };

  const handleDbChange = (_, db: string | null) => {
    if (db !== null) {
      setDb(db);
    }
  };

  return (
    <ThemeContextProvider themeOptions={everestThemeOptions}>
      <Stack>
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
        <ToggleButtonGroup
          fullWidth
          exclusive
          sx={{ padding: 1 }}
          value={db}
          onChange={handleDbChange}
        >
          <ToggleCard value="postgresql">
            <PostgreSqlIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="body1">PostgreSQL</Typography>
          </ToggleCard>
          <ToggleCard value="mongo">
            <MongoIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="body1">MongoDB</Typography>
          </ToggleCard>
          <ToggleCard value="mysql">
            <MySqlIcon fontSize="large" sx={{ mr: 1 }} />
            <Typography variant="body1">MySQL</Typography>
          </ToggleCard>
        </ToggleButtonGroup>
      </Stack>
    </ThemeContextProvider>
  );
};
