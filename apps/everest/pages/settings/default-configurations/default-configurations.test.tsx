import React from 'react';
import { render, screen } from '@testing-library/react';
import { TestWrapper } from '../../../utils/test';
import { DefaultConfigurations } from './default-configurations';
import { Messages } from './default-configurations.messages';

describe('Default Configurations', () => {
  it('should show default values', async () => {
    render(
      <TestWrapper>
        <DefaultConfigurations />
      </TestWrapper>
    );
    expect(screen.getByTestId('default-configurations-info')).toHaveTextContent(
      Messages.pageDescription
    );
    expect(screen.getByTestId('monitoring-control')).toBeInTheDocument();
    expect(
      screen.getByTestId('monitoring-control-checkbox').querySelector('input')
    ).not.toBeChecked();
    expect(screen.getByTestId('backup-control')).toBeInTheDocument();
    expect(
      screen.getByTestId('backup-control-checkbox').querySelector('input')
    ).not.toBeChecked();
    expect(screen.getByTestId('external-access-control')).toBeInTheDocument();
    expect(
      screen
        .getByTestId('external-access-control-checkbox')
        .querySelector('input')
    ).not.toBeChecked();
  });
});
