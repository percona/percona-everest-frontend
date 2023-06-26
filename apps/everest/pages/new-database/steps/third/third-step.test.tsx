import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { TestWrapper } from '../../../../utils/test';
import { ThirdStep } from './third-step';

const FormProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({
    defaultValues: {
      backupsEnabled: true,
      pitrEnabled: true,
      pitrTime: '60',
      storageLocation: 'S3',
      timeNumbers: '1',
      selectTime: 'hours',
      minute: 0,
      minuteHour: 0,
      hour: 12,
      amPm: 'AM',
      weekDay: 'Monday',
      onDay: 1,
    },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('ThirdStep', () => {
  it('should render nothing when backups are disabled', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <ThirdStep />
        </FormProviderWrapper>
      </TestWrapper>
    );
    expect(screen.getByTestId('select-storage-location')).toBeInTheDocument();
    expect(screen.getByTestId('switch-backups-enabled')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('switch-backups-enabled'));
    expect(
      screen.queryByTestId('select-storage-location')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('switch-pitr-enabled')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pitr-time-minutes')).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-time-numbers')).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-time-value')).not.toBeInTheDocument();
  });

  it('should render everything when backups are enabled', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <ThirdStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('switch-backups-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('select-storage-location')).toBeInTheDocument();
    expect(screen.getByTestId('switch-pitr-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('pitr-time-minutes')).toBeInTheDocument();
    expect(screen.getByTestId('select-time-numbers')).toBeInTheDocument();
    expect(screen.getByTestId('select-time-value')).toBeInTheDocument();
  });

  it('should render pitr related fields when pitr is enabled', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <ThirdStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('switch-backups-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('switch-pitr-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('pitr-time-minutes')).toBeInTheDocument();
  });

  it('should render not pitr related fields when pitr is disabled', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <ThirdStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('switch-backups-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('switch-pitr-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('pitr-time-minutes')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('switch-pitr-enabled'));
    expect(screen.queryByTestId('pitr-time-minutes')).not.toBeInTheDocument();
  });

  it('should render hours related field when clicked on hours field', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <ThirdStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('switch-backups-enabled')).toBeInTheDocument();
    expect(screen.queryByTestId('select-time-numbers')).toBeInTheDocument();
    const selectTimeValue = screen.getByTestId('select-time-value');
    expect(selectTimeValue).toBeInTheDocument();

    fireEvent.change(selectTimeValue, { target: { value: 'hours' } });

    expect(selectTimeValue.getAttribute('value')).toBe('hours');
    expect(screen.getByTestId('select-minute-in-hour')).toBeInTheDocument();

    expect(screen.queryByTestId('select-day-in-month')).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-hour')).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-minute')).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-am-pm')).not.toBeInTheDocument();
  });

  it('should render days related field when clicked on days field', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <ThirdStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('switch-backups-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('select-time-numbers')).toBeInTheDocument();
    const selectTimeValue = screen.getByTestId('select-time-value');
    expect(selectTimeValue).toBeInTheDocument();

    fireEvent.change(selectTimeValue, { target: { value: 'days' } });

    expect(selectTimeValue.getAttribute('value')).toBe('days');

    expect(screen.getByTestId('select-hour')).toBeInTheDocument();
    expect(screen.getByTestId('select-minute')).toBeInTheDocument();
    expect(screen.getByTestId('select-am-pm')).toBeInTheDocument();

    expect(
      screen.queryByTestId('select-minute-in-hour')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-week-day')).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-day-in-month')).not.toBeInTheDocument();
  });

  it('should render weeks related field when clicked on weeks field', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <ThirdStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('switch-backups-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('select-time-numbers')).toBeInTheDocument();
    const selectTimeValue = screen.getByTestId('select-time-value');
    expect(selectTimeValue).toBeInTheDocument();

    fireEvent.change(selectTimeValue, { target: { value: 'weeks' } });

    expect(selectTimeValue.getAttribute('value')).toBe('weeks');

    expect(screen.getByTestId('select-week-day')).toBeInTheDocument();
    expect(screen.getByTestId('select-hour')).toBeInTheDocument();
    expect(screen.getByTestId('select-minute')).toBeInTheDocument();
    expect(screen.getByTestId('select-am-pm')).toBeInTheDocument();

    expect(
      screen.queryByTestId('select-minute-in-hour')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-day-in-month')).not.toBeInTheDocument();
  });

  it('should render months related field when clicked on months field', () => {
    render(
      <TestWrapper>
        <FormProviderWrapper>
          <ThirdStep />
        </FormProviderWrapper>
      </TestWrapper>
    );

    expect(screen.getByTestId('switch-backups-enabled')).toBeInTheDocument();
    expect(screen.getByTestId('select-time-numbers')).toBeInTheDocument();
    const selectTimeValue = screen.getByTestId('select-time-value');
    expect(selectTimeValue).toBeInTheDocument();

    fireEvent.change(selectTimeValue, { target: { value: 'months' } });

    expect(selectTimeValue.getAttribute('value')).toBe('months');

    expect(screen.getByTestId('select-day-in-month')).toBeInTheDocument();
    expect(screen.getByTestId('select-hour')).toBeInTheDocument();
    expect(screen.getByTestId('select-minute')).toBeInTheDocument();
    expect(screen.getByTestId('select-am-pm')).toBeInTheDocument();

    expect(
      screen.queryByTestId('select-minute-in-hour')
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId('select-week-day')).not.toBeInTheDocument();
  });
});
