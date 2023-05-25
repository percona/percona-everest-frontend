import React from 'react';
import { render } from '@testing-library/react';
import { BasicEverestCompositionViewer } from './everest-composition-viewer.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicEverestCompositionViewer />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
