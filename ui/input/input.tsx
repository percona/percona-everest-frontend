import { InputAdornment, OutlinedInput } from '@mui/material';
import React from 'react';
import { InputProps } from './input.types';

export function Input({ value, setValue, units }: InputProps) {
  return (
    <OutlinedInput
      sx={{
        '& .MuiInputBase-input': {
          textAlign: 'center',
        },
      }}
      inputProps={{ min: 0 }}
      type="number"
      value={value}
      onChange={(e) => setValue(Number(e.target.value))}
      endAdornment={<InputAdornment position="end">{units}</InputAdornment>}
    />
  );
}
