import { OutlinedInputProps } from '@mui/material';
export interface InputProps extends OutlinedInputProps {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  units: string;
  dataTestId?: string;
}
