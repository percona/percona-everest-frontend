import React, { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TestWrapper } from '../../../../utils/test';
import { BasicInformationFields } from './first-step.types';
import { FirstStep } from './first-step';
import { DbType } from '@percona/ui-lib.db-toggle-card';

jest.unmock('react-native');

jest.mock('./utils', () => ({
  generateShortUID: jest.fn(() => '123'),
}));

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
      [BasicInformationFields.dbType]: DbType.Postresql,
      [BasicInformationFields.dbName]: '',
      [BasicInformationFields.k8sNamespace]: '',
      [BasicInformationFields.dbEnvironment]: '',
      [BasicInformationFields.dbVersion]: '',
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

describe('First Step', () => {
  it('should set default values', async () => {
    const handleSubmitMock = jest.fn();

    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={handleSubmitMock}>
          <FirstStep />
          <button data-testid="submitButton" type="submit">
            submit
          </button>
        </FormProviderWrapper>
      </TestWrapper>
    );
    await waitFor(() => fireEvent.submit(screen.getByTestId('submitButton')));

    expect(handleSubmitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        dbType: DbType.Postresql,
        dbName: 'postgresql-123',
      }),
      expect.anything()
    );
  });
});
