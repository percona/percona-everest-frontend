import React from 'react';
import { render } from '@testing-library/react';
import { BasicResourcesDetail } from './resources-detail.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicResourcesDetail />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
