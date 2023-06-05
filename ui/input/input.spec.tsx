import { render, screen } from '@testing-library/react';
import React, { useState } from 'react';
import { Input } from './input';

const InputWrapper = () => {
  const [value, setValue] = useState<number>(0);
  return <Input value={value} setValue={setValue} units="CPU" />;
};

it('should render with the correct adornment', () => {
  render(<InputWrapper />);
  expect(screen.getByText('CPU')).toBeInTheDocument();
});
