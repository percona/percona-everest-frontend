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
    `/settings/${SettingsTabs.defaultConfigurations}`,
    `/settings/${SettingsTabs.storageLocations}`,
    `/settings/${SettingsTabs.monitoringEndpoints}`,
    `/settings/${SettingsTabs.k8sClusters}`,
  ]);
  const currentTab = routeMatch?.pattern?.path;

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
            value={`/settings/${SettingsTabs.defaultConfigurations}`}
            to={`/settings/${SettingsTabs.defaultConfigurations}`}
            component={Link}
          />
          <Tab
            label={Messages.storageLocations}
            value={`/settings/${SettingsTabs.storageLocations}`}
            to={`/settings/${SettingsTabs.storageLocations}`}
            component={Link}
          />
          <Tab
            label={Messages.monitoringEndpoints}
            value={`/settings/${SettingsTabs.monitoringEndpoints}`}
            to={`/settings/${SettingsTabs.monitoringEndpoints}`}
            component={Link}
          />
          <Tab
            label={Messages.k8sClusters}
            value={`/settings/${SettingsTabs.k8sClusters}`}
            to={`/settings/${SettingsTabs.k8sClusters}`}
            component={Link}
          />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};
