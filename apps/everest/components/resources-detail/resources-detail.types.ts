import { OutlinedInputProps } from '@mui/material';

export type ResourcesDetailProps = {
  label: string;
  labelProgressBar?: string;
  units: string;
  value: number;
  total: number;
  inputValue: number;
  setInputValue: React.Dispatch<React.SetStateAction<number>>;
  inputProps?: Exclude<OutlinedInputProps, 'value'>;
};
