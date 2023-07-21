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
  hours = 'hour',
  days = 'day',
  weeks = 'week',
  months = 'month',
}
export const timeValueHumanized: Record<TimeValue, string> = {
  [TimeValue.hours]: 'Hourly',
  [TimeValue.days]: 'Daily',
  [TimeValue.weeks]: 'Weekly',
  [TimeValue.months]: 'Monthly',
};
export interface TimeSelectionProps {
  showInfoAlert?: boolean;
  sx?: SxProps<Theme>;
  sxTimeFields?: SxProps<Theme>;
}

export type TimeProps = {
  selectTime: TimeValue;
  minute: number;
  hour: number;
  amPm: string;
  onDay: number;
  weekDay: WeekDays;
};
