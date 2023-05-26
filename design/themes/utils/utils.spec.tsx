import React from 'react';
import { render } from '@testing-library/react';
import { BasicUtils } from './utils.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicUtils />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
