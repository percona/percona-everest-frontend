import { LoadableChildrenProps } from '@percona/ui-lib.loadable-children';

export type OverviewSectionProps = {
  title: string;
} & LoadableChildrenProps;

export type OverviewSectionTextProps = {
  children: React.ReactNode;
}
