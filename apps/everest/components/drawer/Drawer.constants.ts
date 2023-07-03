import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
import { EverestRoute } from './Drawer.types';
import {SettingsTabs} from "../../pages/settings/settings.types";

export const DRAWER_WIDTH = 200;

export const ROUTES: EverestRoute[] = [{
  to: '/databases',
  icon: StorageIcon,
  text: 'Databases'
}, {
  to: `settings/${SettingsTabs.defaultConfigurations}`,
  icon: SettingsIcon,
  text: 'Settings',
}];
