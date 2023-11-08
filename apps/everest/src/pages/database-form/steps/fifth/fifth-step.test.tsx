import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TestWrapper } from 'utils/test';
import { FifthStep } from './fifth-step';

vi.mock('hooks/api/monitoring/useMonitoringInstancesList');

const FormProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: { monitoring: false, endpoint: '' },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('AdvancedConfigurations', () => {
  it.skip("should render only monitoring input if it's off", () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <FifthStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('switch-input-monitoring')).toBeInTheDocument();
    expect(screen.queryByTestId('text-input-endpoint')).not.toBeInTheDocument();
  });

  it.skip('should render remaining fields when monitoring is on', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <FifthStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    fireEvent.click(screen.getByTestId('switch-input-monitoring'));

    expect(screen.getByTestId('switch-input-monitoring')).toBeInTheDocument();
    expect(screen.getByTestId('text-input-endpoint')).toBeInTheDocument();
  });
});
