import React from 'react';
import { render } from '@testing-library/react';
import { BasicToggleButtonGroup } from './toggle-button-group.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicToggleButtonGroup />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
