import React from 'react';
import { render } from '@testing-library/react';
import { BasicLoadableChildren } from './loadable-children.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicLoadableChildren />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
