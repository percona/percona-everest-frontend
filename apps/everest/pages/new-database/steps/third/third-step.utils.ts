import { Messages } from './third-step.messages';
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

export const addZeroToSingleDigit = (value: number) => {
  return value.toString().padStart(2, '0');
};

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
  const minuteWithZero = addZeroToSingleDigit(minute);

  if (selectedTime === TimeValue.hours) {
    return `${timeNumbers} ${Messages.getTimeText.hours} ${minuteHour}.`;
  }
  if (selectedTime === TimeValue.days) {
    return `${timeNumbers} ${Messages.getTimeText.days} ${hour}:${minuteWithZero}${amPm}.`;
  }
  if (selectedTime === TimeValue.weeks) {
    return `${timeNumbers} ${Messages.getTimeText.weeks} ${weekDay}, ${Messages.at} ${hour}:${minuteWithZero}${amPm}.`;
  }
  if (selectedTime === TimeValue.months) {
    return `${timeNumbers} ${Messages.getTimeText.months} ${onDay} ${Messages.at} ${hour}:${minuteWithZero}${amPm}.`;
  }
};
