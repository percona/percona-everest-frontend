import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { FormProvider, useForm, Controller } from 'react-hook-form';
import { Switch } from '@mui/material';
import { OutlinedFormControlLabelWrapper } from './outlined-form-control-label-wrapper';
import { TestWrapper } from '../../utils/test';

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
        <OutlinedFormControlLabelWrapper
          labelHeader="test header"
          labelMessage="test message"
          control={
            <Controller
              control={methods.control}
              name="testEnabled"
              render={({ field }) => (
                <Switch {...field} checked={field.value} />
              )}
            />
          }
        >
          {children}
        </OutlinedFormControlLabelWrapper>
      </form>
    </FormProvider>
  );
};

describe('Outlined Form Control Wrapper', () => {
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
