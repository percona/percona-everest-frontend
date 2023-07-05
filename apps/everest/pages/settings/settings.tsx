import { Box, Tab, Tabs } from '@mui/material';
import React from 'react';
import { useLocation, Outlet, Link, matchPath } from 'react-router-dom';

import { SettingsTabs } from './settings.types';
import { Messages } from './settings.messages';

function useRouteMatch(patterns: readonly string[]) {
  const { pathname } = useLocation();

  for (let i = 0; i < patterns.length; i += 1) {
    const pattern = patterns[i];
    const possibleMatch = matchPath(pattern, pathname);
    if (possibleMatch !== null) {
      return possibleMatch;
    }
  }

  return null;
}

export const Settings = () => {
  const routeMatch = useRouteMatch([
    `/settings/:tabs`,
  ]);
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
          <Tab
            label={Messages.defaultConfigurations}
            value={SettingsTabs.defaultConfigurations}
            to={SettingsTabs.defaultConfigurations}
            component={Link}
          />
          <Tab
            label={Messages.storageLocations}
            value={SettingsTabs.storageLocations}
            to={SettingsTabs.storageLocations}
            component={Link}
          />
          <Tab
            label={Messages.monitoringEndpoints}
            value={SettingsTabs.monitoringEndpoints}
            to={SettingsTabs.monitoringEndpoints}
            component={Link}
          />
          <Tab
            label={Messages.k8sClusters}
            value={SettingsTabs.k8sClusters}
            to={SettingsTabs.k8sClusters}
            component={Link}
          />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};
