import { TimeValue } from './third-step.types';

export const weekDays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const getTimeText = (
  selectedTime: TimeValue,
  timeNumbers: number,
  minuteHour: number,
  hour: number,
  minute: number,
  amPm: string,
  weekDay: string,
  onDay: number
) => {
  if (selectedTime === TimeValue.hours) {
    return `${timeNumbers} hours, starting at minute ${minuteHour}.`;
  }
  if (selectedTime === TimeValue.days) {
    return `${timeNumbers} days, at ${hour}:${minute}${amPm}.`;
  }
  if (selectedTime === TimeValue.weeks) {
    return `${timeNumbers} weeks on ${weekDay}, at ${hour}:${minute}${amPm}.`;
  }
  if (selectedTime === TimeValue.months) {
    return `${timeNumbers} months, on day ${onDay} at ${hour}:${minute}${amPm}.`;
  }
};
