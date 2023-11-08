import { LoadableChildrenProps } from '@percona/ui-lib';

export type OverviewSectionProps = {
  title: string;
} & LoadableChildrenProps;

export type OverviewSectionTextProps = {
  children: React.ReactNode;
};
