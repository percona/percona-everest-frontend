import { SvgIconProps } from '@mui/material';

export interface StatusIconProps extends SvgIconProps {
  size?: 'large' | 'small';
}

export interface IconsProps {
  iconWidth: string;
  props: SvgIconProps;
}

export interface StatusIconProviderProps {
  LightIconGeneral: React.FC<IconsProps>;
  DarkIconGeneral: React.FC<IconsProps>;
  props: StatusIconProps;
}
