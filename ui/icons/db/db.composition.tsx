import React from 'react';
import { MySqlIcon, MongoIcon, PostgreSqlIcon } from './db';
import { Box, Card, ToggleButton, Typography } from '@mui/material';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { getTheme } from '@percona/design.themes.everest';

export const MySql = () => (
  <Box sx={{ fontSize: '100px', margin: 0 }}>
    <MySqlIcon fontSize="inherit" />
  </Box>
);

export const MongoDB = () => (
  <Box sx={{ fontSize: '100px', margin: 0 }}>
    <MongoIcon fontSize="inherit" />
  </Box>
);

export const PostgreSql = () => (
  <Box sx={{ fontSize: '100px', margin: 0 }}>
    <PostgreSqlIcon fontSize="inherit" />
  </Box>
);

MySql.compositionName = 'MySQL';
MongoDB.compositionName = 'MongoDB';
PostgreSql.compositionName = 'PostgreSQL';
