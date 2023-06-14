import React from 'react';
import { Box } from '@mui/material';
import { MySqlIcon, MongoIcon, PostgreSqlIcon } from './db';

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
