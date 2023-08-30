import React, { ReactNode } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { FormProvider, useForm } from 'react-hook-form';
import { TestWrapper } from '../../../../utils/test';
import { SecondStep } from './second-step';
import { NumberOfNodes, ResourceSize } from './second-step.types';
import { DEFAULT_SIZES } from './second-step.const';
import { DbWizardFormFields } from '../../database-form.types';

jest.mock('../../../../hooks/api/kubernetesClusters/useSelectedKubernetesCluster');
jest.mock('../../../../hooks/api/kubernetesClusters/useKubernetesClusterResourcesInfo');

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
      [DbWizardFormFields.numberOfNodes]: NumberOfNodes.oneNode,
      [DbWizardFormFields.resourceSizePerNode]: ResourceSize.small,
      [DbWizardFormFields.cpu]: DEFAULT_SIZES.small.cpu,
      [DbWizardFormFields.disk]: DEFAULT_SIZES.small.disk,
      [DbWizardFormFields.memory]: DEFAULT_SIZES.small.memory,
    },
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>{children}</form>
    </FormProvider>
  );
};

describe('Second Step', () => {
  it('should set default values', async () => {
    const handleSubmitMock = jest.fn();

    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={handleSubmitMock}>
          <SecondStep />
          <button data-testid="submitButton" type="submit">
            submit
          </button>
        </FormProviderWrapper>
      </TestWrapper>
    );

    await waitFor(() => fireEvent.submit(screen.getByTestId('submitButton')));

    expect(handleSubmitMock).toHaveBeenCalledWith(
      expect.objectContaining({
        [DbWizardFormFields.cpu]: 1,
        [DbWizardFormFields.disk]: 25,
        [DbWizardFormFields.memory]: 2,
        [DbWizardFormFields.numberOfNodes]: '1',
        [DbWizardFormFields.resourceSizePerNode]: 'small',
      }),
      expect.anything()
    );
  });
  it('should change input values while switching resource size per node tabs', async () => {
    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={jest.fn()}>
          <SecondStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('cpu-input')).toHaveValue(
      DEFAULT_SIZES[ResourceSize.small][DbWizardFormFields.cpu]
    );
    expect(screen.getByTestId('memory-input')).toHaveValue(
      DEFAULT_SIZES[ResourceSize.small][DbWizardFormFields.memory]
    );
    expect(screen.getByTestId('disk-input')).toHaveValue(
      DEFAULT_SIZES[ResourceSize.small][DbWizardFormFields.disk]
    );

    const mediumButton = screen.getByTestId('toggle-button-medium');
    await waitFor(() => fireEvent.click(mediumButton));

    expect(screen.getByTestId('cpu-input')).toHaveValue(
      DEFAULT_SIZES[ResourceSize.medium][DbWizardFormFields.cpu]
    );
    expect(screen.getByTestId('memory-input')).toHaveValue(
      DEFAULT_SIZES[ResourceSize.medium][DbWizardFormFields.memory]
    );
    expect(screen.getByTestId('disk-input')).toHaveValue(
      DEFAULT_SIZES[ResourceSize.medium][DbWizardFormFields.disk]
    );
  });

  it('should set custom tab when resource size per node input is changed by user', async () => {
    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={jest.fn()}>
          <SecondStep />
          <button data-testid="submitButton" type="submit">
            submit
          </button>
        </FormProviderWrapper>
      </TestWrapper>
    );
    const cpu = screen.getByTestId('cpu-input');

    expect(cpu).toHaveValue(
      DEFAULT_SIZES[ResourceSize.small][DbWizardFormFields.cpu]
    );

    await waitFor(() => fireEvent.change(cpu, { target: { value: 5 } }));

    expect(cpu).toHaveValue(5);

    const pressedButtons = screen.getAllByRole('button', { pressed: true });
    expect(pressedButtons[0]).toHaveValue(NumberOfNodes.oneNode);
    expect(pressedButtons[1]).toHaveValue(ResourceSize.custom);
  });
  // TODO should be fixed
  it.skip('should show warning when the value entered by the user exceeds the maximum recommended value', async () => {
    render(
      <TestWrapper>
        <FormProviderWrapper handleSubmit={jest.fn()}>
          <SecondStep />
          <button data-testid="submitButton" type="submit">
            submit
          </button>
        </FormProviderWrapper>
      </TestWrapper>
    );

    const cpu = screen.getByTestId('cpu-input');
    expect(cpu).toHaveValue(
      DEFAULT_SIZES[ResourceSize.small][DbWizardFormFields.cpu]
    );
    expect(
      screen.queryByTestId('resources-exceeding-alert')
    ).not.toBeInTheDocument();

    const maxCPU =
      screen.getByTestId('cpu-progress-bar').getAttribute('aria-valuemax') ||
      '';

    await waitFor(() =>
      fireEvent.change(cpu, { target: { value: +maxCPU + 1 } })
    );

    expect(screen.getByTestId('resources-exceeding-alert')).toBeInTheDocument();
  });
});
