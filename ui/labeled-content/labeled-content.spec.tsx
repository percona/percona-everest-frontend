import React from 'react';
import { render } from '@testing-library/react';
import { BasicLabeledContent } from './labeled-content.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicLabeledContent />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
