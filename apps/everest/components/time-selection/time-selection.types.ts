import { Theme, SxProps } from '@mui/material';

export enum WeekDays {
  Mo = 'Monday',
  Tu = 'Tuesday',
  We = 'Wednesday',
  Th = 'Thursday',
  Fr = 'Friday',
  Sa = 'Saturday',
  Su = 'Sunday',
}

export const weekDaysPlural = (day: WeekDays) => `${day}s`;

export enum AmPM {
  AM = 'AM',
  PM = 'PM',
}

export enum TimeValue {
  hours = 'Hourly',
  days = 'Daily',
  weeks = 'Weekly',
  months = 'Monthly',
}

export interface TimeSelectionProps {
  showInfoAlert?: boolean;
  sx?: SxProps<Theme>;
  sxTimeFields?: SxProps<Theme>;
}
