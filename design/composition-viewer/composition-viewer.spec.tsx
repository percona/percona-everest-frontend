import React from 'react';
import { render } from '@testing-library/react';
import { BasicCompositionViewer } from './composition-viewer.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicCompositionViewer />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
