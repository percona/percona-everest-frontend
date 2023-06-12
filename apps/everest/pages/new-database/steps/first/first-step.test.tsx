import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { TestWrapper } from '../../../../utils/test';
import { FormProvider, useForm } from 'react-hook-form';
import { BasicInformationFields } from './first-step.types';
import { DbType } from '../../../../../../ui/db-toggle-card';
import {FirstStep} from "./first-step";
jest.unmock('react-native');

const FormProviderWrapper = ({ children, handleSubmit }) => {
  const methods = useForm({
    defaultValues: {
      [BasicInformationFields.dbType]: DbType.Mongo,
      [BasicInformationFields.dbName]: '',
      [BasicInformationFields.k8sNamespace]: '',
      [BasicInformationFields.dbEnvironment]: '',
      [BasicInformationFields.dbVersion]: '',
    },
  });

  return <FormProvider {...methods} handleSubmit={handleSubmit}>{children}</FormProvider>;
};

describe('First Step', () => {
  it("should set default values", async () => {
    const handleSubmitMock = jest.fn((e)=> console.log(e));

    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={handleSubmitMock}>
          <FirstStep />
          <button data-testid="submitButton" type="submit">submit</button>
        </FormProviderWrapper>
      </TestWrapper>
    );
    await waitFor(() => fireEvent.submit(screen.getByTestId('submitButton')));

    //TODO doesn't work
    expect(handleSubmitMock).toHaveBeenCalledWith(expect.objectContaining({ dbType: DbType.Postresql }), expect.anything());
  });
});
