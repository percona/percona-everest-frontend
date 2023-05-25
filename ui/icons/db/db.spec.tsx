import React from 'react';
import { render } from '@testing-library/react';
import { MySql } from './db.composition';

it('should render with the correct text', () => {
  const { getByText } = render(<MySql />);
  const rendered = getByText('hello world!');
  expect(rendered).toBeTruthy();
});
