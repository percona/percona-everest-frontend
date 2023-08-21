import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Link, Outlet, useMatch } from 'react-router-dom';

import { Messages } from './settings.messages';
import { SettingsTabs } from './settings.types';

export const Settings = () => {
  const routeMatch = useMatch('/settings/:tabs');
  const currentTab = routeMatch?.params?.tabs;

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={currentTab}
          variant="scrollable"
          allowScrollButtonsMobile
          aria-label="nav tabs"
        >
          {Object.keys(SettingsTabs).map((item) => (
            <Tab
              label={Messages[item]}
              key={SettingsTabs[item]}
              value={SettingsTabs[item]}
              to={SettingsTabs[item]}
              component={Link}
            />
          ))}
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};
