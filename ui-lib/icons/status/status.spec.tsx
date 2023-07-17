import React from 'react';
import { render } from '@testing-library/react';
import { BasicStatus } from './status.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicStatus />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
