import { InputProps } from '@percona/ui-lib.input';

export type ResourcesDetailProps = {
  label: string;
  labelProgressBar?: string;
  value: number;
  total: number;
  inputProps?: InputProps;
};
