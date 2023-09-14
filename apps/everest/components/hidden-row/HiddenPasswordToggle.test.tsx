import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import { HiddenPasswordToggle } from './HiddenPasswordToggle';

describe('Drawer', () => {
  it('Should hide row by default', () => {
    render(<HiddenPasswordToggle value="test" />);
    expect(screen.getByTestId('hidden-row')).toHaveTextContent('****');
  });
  it('Should show row by icon click', async () => {
    render(<HiddenPasswordToggle value="test" />);
    expect(screen.getByTestId('hidden-row')).toHaveTextContent('****');
    const visabilityIcon = screen.getByTestId('VisibilityIcon');
    expect(visabilityIcon).toBeInTheDocument();
    await fireEvent.click(visabilityIcon);
    expect(screen.getByTestId('hidden-row')).toHaveTextContent('test');
    expect(screen.getByTestId('VisibilityOffIcon')).toBeInTheDocument();
  });
});
