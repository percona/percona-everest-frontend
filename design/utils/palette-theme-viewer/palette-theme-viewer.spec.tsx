import React from 'react';
import { render } from '@testing-library/react';
import { BasicPaletteThemeViewer } from './palette-theme-viewer.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicPaletteThemeViewer />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
