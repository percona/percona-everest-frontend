import { InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';

export type InputProps = {
  /**
   * a node to be rendered in the special component.
   */
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  units: string;
};

export function Input({ value, setValue, units }: InputProps) {
  return (
    <OutlinedInput
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      endAdornment={<InputAdornment position="end">{units}</InputAdornment>}
    />
  );
}
