import React from 'react';
import { render, screen } from '@testing-library/react';
import { Label } from './label';

describe('Label with header and description for form control label component', () => {
  it('should show label header and label message', async () => {
    render(<Label labelHeader="test Header" labelMessage="testMessage" />);
    expect(screen.getByTestId('label-header')).toBeInTheDocument();
    expect(screen.getByTestId('label-message')).toBeInTheDocument();
  });

  it('should show only header', async () => {
    render(<Label labelHeader="test Header" />);
    expect(screen.getByTestId('label-header')).toBeInTheDocument();
    expect(screen.queryByTestId('label-message')).not.toBeInTheDocument();
  });

  it('should show only message', async () => {
    render(<Label labelMessage="testMessage" />);
    expect(screen.getByTestId('label-message')).toBeInTheDocument();
    expect(screen.queryByTestId('label-header')).not.toBeInTheDocument();
  });
});
