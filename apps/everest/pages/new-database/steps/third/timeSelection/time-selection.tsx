import {
  Alert,
  Box,
  MenuItem,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import React, { useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from '../third-step.messages';
import { TimeValue } from '../third-step.types';
import {
  addZeroToSingleDigit,
  getTimeText,
  weekDays,
} from '../third-step.utils';

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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
              sx={{ width: '120px' }}
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
        {selectedTime === TimeValue.hours && (
          <>
            <Typography variant="sectionHeading">{Messages.onMinute}</Typography>
            <Controller
              control={control}
              name="minuteHour"
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ width: '80px' }}
                  select
                  inputProps={{
                    'data-testid': 'select-minute-in-hour',
                  }}
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </>
        )}
        {selectedTime === TimeValue.weeks && (
          <>
            <Typography variant="sectionHeading">{Messages.on}</Typography>
            <Controller
              control={control}
              name="weekDay"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  inputProps={{
                    'data-testid': 'select-week-day',
                  }}
                >
                  {weekDays.map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </>
        )}
        {selectedTime === TimeValue.months && (
          <>
            <Typography variant="sectionHeading">{Messages.onDay}</Typography>
            <Controller
              control={control}
              name="onDay"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  inputProps={{
                    'data-testid': 'select-day-in-month',
                  }}
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </>
        )}
        {(selectedTime === TimeValue.days ||
          selectedTime === TimeValue.weeks ||
          selectedTime === TimeValue.months) && (
          <>
            <Typography variant="sectionHeading">{Messages.at}</Typography>
            <Controller
              control={control}
              name="hour"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  inputProps={{
                    'data-testid': 'select-hour',
                  }}
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              control={control}
              name="minute"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  inputProps={{
                    'data-testid': 'select-minute',
                  }}
                >
                  {Array.from({ length: 60 }, (_, i) => i).map((value) => (
                    <MenuItem key={value} value={value}>
                      {addZeroToSingleDigit(value)}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
            <Controller
              control={control}
              name="amPm"
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  inputProps={{
                    'data-testid': 'select-am-pm',
                  }}
                >
                  <MenuItem value="AM">{Messages.am}</MenuItem>
                  <MenuItem value="PM">{Messages.pm}</MenuItem>
                </TextField>
              )}
            />
          </>
        )}
      </Box>
      <Alert severity="info">{Messages.infoText(timeInfoText)}</Alert>
    </>
  );
};
