import { AutoCompleteInputProps } from '@percona/ui-lib.form.inputs.auto-complete';

export type AutoCompleteAutoFillProps<T> = AutoCompleteInputProps<T> & {
  enableFillFirst?: boolean;
  fillFirstField?: string;
};
