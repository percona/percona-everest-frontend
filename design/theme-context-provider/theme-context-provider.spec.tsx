import React from 'react';
import { render } from '@testing-library/react';
import { BasicThemeContextProvider } from './theme-context-provider.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicThemeContextProvider />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
