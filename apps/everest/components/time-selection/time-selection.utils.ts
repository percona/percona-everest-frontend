// percona-everest-frontend
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
// import { CronTime } from 'cron-time-generator';
import CronTime from 'cron-time-generator';
import { Messages } from './time-selection.messages';
import { AmPM, TimeProps, TimeValue } from './time-selection.types';

export const addZeroToSingleDigit = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const getTimeText = (
  selectedTime: TimeValue,
  hour: number,
  minute: number,
  amPm: string,
  weekDay: string,
  onDay: number
) => {
  const minuteWithZero = addZeroToSingleDigit(minute);

  if (selectedTime === TimeValue.days) {
    return `${Messages.getTimeText.days} ${hour}:${minuteWithZero}${amPm}.`;
  }
  if (selectedTime === TimeValue.weeks) {
    return `${Messages.getTimeText.weeks} ${weekDay}, ${Messages.at} ${hour}:${minuteWithZero}${amPm}.`;
  }
  if (selectedTime === TimeValue.months) {
    return `${Messages.getTimeText.months} ${onDay} ${Messages.at} ${hour}:${minuteWithZero}${amPm}.`;
  }
  return `${Messages.getTimeText.hours} ${minute}.`;
};

export const getCronExpressionFromFormValues = (
  timeProps: TimeProps
): string => {
  const { minute, hour, amPm, onDay, weekDay, selectedTime } = timeProps;

  const parsedMinute = Number(minute);
  const parsedHour = Number(hour);
  const parsedDay = Number(onDay);

  const hour24 =
    amPm === AmPM.PM ? (parsedHour === 12 ? 0 : parsedHour + 12) : parsedHour;

  switch (selectedTime) {
    case TimeValue.hours:
      return CronTime.everyHourAt(parsedMinute);
    case TimeValue.days:
      return CronTime.everyDayAt(hour24, parsedMinute);
    case TimeValue.weeks:
      return CronTime.onSpecificDaysAt([weekDay!], hour24, parsedMinute);
    case TimeValue.months:
      return CronTime.everyMonthOn(parsedDay, hour24, parsedMinute);
    default:
      return CronTime.everyHourAt(5);
  }
};
