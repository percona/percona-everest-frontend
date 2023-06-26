import { Alert, Box, MenuItem, OutlinedInput, TextField } from '@mui/material';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from '../third-step.messages';
import { TimeValue } from '../third-step.types';
import { getTimeText } from '../third-step.utils';
import { HoursField } from './fields/hours-field';
import { MonthsField } from './fields/months-field';
import { TimeFields } from './fields/time-fields';
import { WeeksField } from './fields/weeks-field';

export const TimeSelection = () => {
  const { control, watch } = useFormContext();
  const selectedTime: TimeValue = watch('selectTime');
  const timeNumbers: number = watch('timeNumbers');
  const minuteHour: number = watch('minuteHour');
  const minute: number = watch('minute');
  const hour: number = watch('hour');
  const amPm: string = watch('amPm');
  const weekDay: string = watch('weekDay');
  const onDay: number = watch('onDay');

  const timeInfoText = useMemo(
    () =>
      getTimeText(
        selectedTime,
        timeNumbers,
        minuteHour,
        hour,
        minute,
        amPm,
        weekDay,
        onDay
      ),
    [selectedTime, timeNumbers, minuteHour, hour, minute, amPm, weekDay, onDay]
  );

  return (
    <>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}
      >
        <Controller
          control={control}
          name="timeNumbers"
          render={({ field }) => (
            <OutlinedInput
              {...field}
              sx={{ width: '80px' }}
              type="number"
              inputProps={{
                'data-testid': 'select-time-numbers',
              }}
              onChange={(e) => {
                const v = e.target.value;
                if (v !== '' && Number(v) < 1) {
                  field.onChange('1');
                } else {
                  field.onChange(v);
                }
              }}
              onBlur={(e) => {
                field.onBlur();
                const v = e.target.value;
                if (v === '') {
                  field.onChange('1');
                }
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="selectTime"
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ minWidth: '120px' }}
              select
              inputProps={{
                'data-testid': 'select-time-value',
              }}
            >
              {Object.values(TimeValue).map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {selectedTime === TimeValue.hours && <HoursField />}
          {selectedTime === TimeValue.weeks && <WeeksField />}
          {selectedTime === TimeValue.months && <MonthsField />}
          {(selectedTime === TimeValue.days ||
            selectedTime === TimeValue.weeks ||
            selectedTime === TimeValue.months) && <TimeFields />}
        </Box>
      </Box>
      <Alert severity="info">{Messages.infoText(timeInfoText)}</Alert>
    </>
  );
};
