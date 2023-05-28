import React from 'react';
import { render } from '@testing-library/react';
import { BasicToggleCard } from './toggle-card.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicToggleCard />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
