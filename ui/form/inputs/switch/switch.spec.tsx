import React from 'react';
import { render } from '@testing-library/react';
import { BasicSwitch } from './switch.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicSwitch />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
