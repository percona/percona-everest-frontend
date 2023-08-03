// percona-everest-backend
// Copyright (C) 2023 Percona LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
  selectedTime: TimeValue;
  minute: number;
  hour: number;
  amPm: string;
  onDay: number;
  weekDay: WeekDays;
};
