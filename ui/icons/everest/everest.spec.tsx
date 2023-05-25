import React from 'react';
import { render } from '@testing-library/react';
import { BasicEverest } from './everest.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicEverest />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
