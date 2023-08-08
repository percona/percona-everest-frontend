import { CronTime } from 'cron-time-generator';
import {
  TimeValue,
  timeValueHumanized,
} from '../../../components/time-selection/time-selection.types';
import { addZeroToSingleDigit } from '../../../components/time-selection/time-selection.utils';
import { SectionProps } from './sections/section.types';

// TODO re-add steps after API is ready
export const Messages = {
  title: 'Database Summary',
  preview: [
    'Basic Information',
    'Resources',
    // 'Backups',
    'External Access',
    // 'Monitoring',
  ],
};

export const getTimeSelectionPreviewMessage = (sectionProps: SectionProps) => {
  const { minute, hour, amPm, onDay, weekDay, selectedTime } = sectionProps;
  // TODO switch these lines after backup is supported and Zod schema is complete
  // const minuteWithZero = addZeroToSingleDigit(minute);
  const minuteWithZero = addZeroToSingleDigit(0);
  switch (selectedTime) {
    case TimeValue.hours:
      return `Every hour at minute ${minute}`;
    case TimeValue.days:
      return `${timeValueHumanized[selectedTime]} at ${hour}:${minuteWithZero} ${amPm}`;
    case TimeValue.weeks:
      return `${timeValueHumanized[selectedTime]} on ${weekDay}s at ${hour}:${minuteWithZero} ${amPm}`;
    case TimeValue.months:
      return `${timeValueHumanized[selectedTime]} on day ${onDay} at ${hour}:${minuteWithZero} ${amPm}`;
    default:
      return CronTime.everyHourAt(5);
  }
};
