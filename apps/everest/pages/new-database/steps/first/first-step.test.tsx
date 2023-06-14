import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TestWrapper } from '../../../../utils/test';
import { FormProvider, useForm } from 'react-hook-form';
import { BasicInformationFields } from './first-step.types';
import { DbType } from '../../../../../../ui/db-toggle-card';
import { FirstStep } from "./first-step";
jest.unmock('react-native');

jest.mock('./utils', () => ({
  generateShortUID: jest.fn(() => "123"),
}));

const FormProviderWrapper = ({ children, handleSubmit }) => {
  const methods = useForm({
    defaultValues: {
      [BasicInformationFields.dbType]: DbType.Postresql,
      [BasicInformationFields.dbName]: '',
      [BasicInformationFields.k8sNamespace]: '',
      [BasicInformationFields.dbEnvironment]: '',
      [BasicInformationFields.dbVersion]: '',
    },
  });

  return <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form></FormProvider>;
};

describe('First Step', () => {
  it("should set default values", async () => {
    const handleSubmitMock = jest.fn();

    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={handleSubmitMock}>
          <FirstStep />
          <button data-testid="submitButton" type="submit">submit</button>
        </FormProviderWrapper>
      </TestWrapper>
    );
    await waitFor(() => fireEvent.submit(screen.getByTestId('submitButton')));

    expect(handleSubmitMock).toHaveBeenCalledWith(expect.objectContaining({ dbType: DbType.Postresql, dbName: "postgresql-123" }),  expect.anything());
  });
});
