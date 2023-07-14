import React, { useState } from 'react';
import { ThemeContextProvider } from '@percona/design.theme-context-provider';
import { everestThemeOptions } from '@percona/design.themes.everest';
import { ToggleButtonGroup } from '@mui/material';
import { DbToggleCard } from './db-toggle-card';
import { DbType } from './db-toggle-card.types';

export const BasicDbToggleCard = () => {
  const [dbType, setDbType] = useState<DbType>(DbType.Postresql);

  const handleDbChange = (_, db: DbType | null) => {
    if (db !== null) {
      setDbType(db);
    }
  };

  return (
    <ThemeContextProvider themeOptions={everestThemeOptions}>
      <ToggleButtonGroup
        fullWidth
        exclusive
        sx={{ padding: 1 }}
        value={dbType}
        onChange={handleDbChange}
      >
        <DbToggleCard value={DbType.Postresql} />
        <DbToggleCard value={DbType.Mongo} />
        <DbToggleCard value={DbType.Mysql} />
      </ToggleButtonGroup>
    </ThemeContextProvider>
  );
};
