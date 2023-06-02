import React from 'react';
import { render } from '@testing-library/react';
import { BasicResourcesDetails } from './resources-details.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicResourcesDetails />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
