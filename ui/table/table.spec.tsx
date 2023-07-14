import React from 'react';
import { render } from '@testing-library/react';
import { BasicTable } from './table.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<BasicTable />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
