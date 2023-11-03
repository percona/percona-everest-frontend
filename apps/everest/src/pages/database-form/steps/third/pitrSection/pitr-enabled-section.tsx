import { InputAdornment, OutlinedInput, Typography } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { Messages } from '../third-step.messages';
import { Messages as TimeSelectionMessages } from '@/components/time-selection/time-selection.messages';

export const PitrEnabledSection = () => {
  const { control } = useFormContext();
  return (
    <>
      <Typography variant="sectionHeading">
        {Messages.pitrCreateHeader}
      </Typography>
      <Controller
        control={control}
        name="pitrTime"
        render={({ field }) => (
          <OutlinedInput
            {...field}
            sx={{ width: '150px' }}
            type="number"
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
            endAdornment={
              <InputAdornment position="end">
                {TimeSelectionMessages.minutes}
              </InputAdornment>
            }
            inputProps={{
              'data-testid': 'pitr-time-minutes',
            }}
          />
        )}
      />
    </>
  );
};
