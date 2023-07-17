import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TestWrapper } from '../../utils/test';
import { SwitchOutlinedBox } from './switch-oulined-box';

interface FormProviderWrapperProps {
  handleSubmit: jest.Mock<any, any>;
  children: ReactNode;
}
const FormProviderWrapper = ({
  children,
  handleSubmit,
}: FormProviderWrapperProps) => {
  const methods = useForm({
    defaultValues: {
      testEnabled: true,
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <SwitchOutlinedBox name="test" label="test" control={methods.control}>
          {children}
        </SwitchOutlinedBox>
      </form>
    </FormProvider>
  );
};

describe('Switch Outlined Box', () => {
  it('should show controller and child', async () => {
    const handleSubmitMock = jest.fn();

    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={handleSubmitMock}>
          <div data-testid="test child">test child content</div>
        </FormProviderWrapper>
      </TestWrapper>
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByTestId('test child')).toBeInTheDocument();
  });
});
