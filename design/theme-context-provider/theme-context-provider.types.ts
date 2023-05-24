import { getThemeType } from '@percona/design.themes.base';

export type ThemeContextProviderProps = {
  children: React.ReactNode;
  getThemeFn?: getThemeType;
};
