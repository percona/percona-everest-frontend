import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { Outlet, Link } from 'react-router-dom';

import { SettingsTabs } from './settings.types';
import { Messages } from './settings.messages';
import { useRouteMatch } from '../../hooks/settings/useRouteMatch';

export const Settings = () => {
  const routeMatch = useRouteMatch([`/settings/:tabs`]);
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
