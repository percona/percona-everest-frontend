import { Box, Tab, Tabs } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import { SettingsTabs, settingsTabsMui } from './settings.types';
import { Messages } from './settings.messages';

interface LinkTabProps {
  label: string;
  href: string;
}

function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();

  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate(`/settings${props.href}`);
      }}
      {...props}
    />
  );
}
export const Settings = () => {
  const location = useLocation();
  const locationPathArray = location.pathname.split('/');
  const urlLocation = locationPathArray[
    locationPathArray.length - 1
  ] as SettingsTabs;

  const [value, setValue] = React.useState(settingsTabsMui[urlLocation]);

  // it is necessary for the correct installation of the first tab when clicking on the settings panel on the left
  // again, since returning to settings/default is a return without reloading
  useEffect(() => {
    if (value !== settingsTabsMui[urlLocation]) {
      setValue(settingsTabsMui[urlLocation]);
    }
  }, [urlLocation]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={handleChange}
          aria-label="nav tabs"
        >
          <LinkTab
            label={Messages.defaultConfigurations}
            href="/defaultConfigurations"
          />
          <LinkTab label={Messages.storageLocations} href="/storageLocations" />
          <LinkTab
            label={Messages.monitoringEndpoints}
            href="/monitoringEndpoints"
          />
          <LinkTab label={Messages.k8sClusters} href="/k8sClusters" />
        </Tabs>
      </Box>
      <Outlet />
    </Box>
  );
};
