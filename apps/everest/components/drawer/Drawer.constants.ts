import StorageIcon from '@mui/icons-material/Storage';
import { EverestRoute } from './Drawer.types';

export const DRAWER_WIDTH = 200;

export const ROUTES: EverestRoute[] = [{
  to: '/databases',
  icon: StorageIcon,
  text: 'Databases'
}];
