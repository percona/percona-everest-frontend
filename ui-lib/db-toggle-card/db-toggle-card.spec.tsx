import React from 'react';
import { render, screen } from '@testing-library/react';
import { DbToggleCard } from './db-toggle-card';
import { DbType } from './db-toggle-card.types';

describe('DbToggleCard', () => {
  it('should render DB name', () => {
    render(<DbToggleCard value={DbType.Mongo} />);
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByTestId('mongodb-toggle-button')).toBeInTheDocument();
  });
});
