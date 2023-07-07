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

export enum AmPM {
  AM = 'AM',
  PM = 'PM',
}

export enum TimeValue {
  hours = 'hours',
  days = 'days',
  weeks = 'weeks',
  months = 'months',
}

export interface TimeSelectionProps {
  hideInfoAlert?: boolean;
  sx?: SxProps<Theme>;
  sxTimeFields?: SxProps<Theme>;
}
