// import { CronTime } from 'cron-time-generator';
import { Messages } from './time-selection.messages';
import { TimeValue } from './time-selection.types';

export const addZeroToSingleDigit = (value: number) => {
  return value.toString().padStart(2, '0');
};

export const getTimeText = (
  selectedTime: TimeValue,
  timeNumbers: number,
  hour: number,
  minute: number,
  amPm: string,
  weekDay: string,
  onDay: number
) => {
  const minuteWithZero = addZeroToSingleDigit(minute);

  if (selectedTime === TimeValue.days) {
    return `${timeNumbers} ${Messages.getTimeText.days} ${hour}:${minuteWithZero}${amPm}.`;
  }
  if (selectedTime === TimeValue.weeks) {
    return `${timeNumbers} ${Messages.getTimeText.weeks} ${weekDay}, ${Messages.at} ${hour}:${minuteWithZero}${amPm}.`;
  }
  if (selectedTime === TimeValue.months) {
    return `${timeNumbers} ${Messages.getTimeText.months} ${onDay} ${Messages.at} ${hour}:${minuteWithZero}${amPm}.`;
  }
  return `${timeNumbers} ${Messages.getTimeText.hours} ${minute}.`;
};

// export const getCronExpressionFromFormValues = (timeProps: TimeProps): string => {
//   const { minute, hour, amPm, onDay, weekDay, selectTime } = timeProps;
//   const hour24 = amPm === AmPM.PM ? (hour === 12 ? 0 : hour + 12) : hour;
//   switch (selectTime) {
//     case TimeValue.hours:
//       return CronTime.everyHourAt(minute);
//     case TimeValue.days:
//       return CronTime.everyDayAt(hour24, minute);
//     case TimeValue.weeks:
//       return CronTime.onSpecificDaysAt([weekDay], hour24, minute);
//     case TimeValue.months:
//       return CronTime.everyMonthOn(onDay, hour24, minute);
//     default:
//       return CronTime.everyHourAt(5);
//   }
// };
