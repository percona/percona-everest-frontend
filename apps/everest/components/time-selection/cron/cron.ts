import { UNITS } from './cron.constants';
import { PeriodType, Unit, LeadingZero, ClockFormat } from './cron.types';

const dateSort = (a: number, b: number) => a - b;

const fixSunday = (values: number[], unit: Unit) => {
  if (unit.type === 'week-days') {
    // eslint-disable-next-line no-param-reassign
    values = values.map((value) => {
      if (value === 7) {
        return 0;
      }

      return value;
    });
  }

  return values;
};

const outOfRange = (values: number[], unit: Unit) => {
  const first = values[0];
  const last = values[values.length - 1];

  if (first < unit.min) {
    return first;
  }
  if (last > unit.max) {
    return last;
  }
  return undefined;
};

const isFull = (values: number[], unit: Unit) =>
  values.length === unit.max - unit.min + 1;

const getStep = (values: number[]) => {
  if (values.length > 2) {
    const step = values[1] - values[0];

    if (step > 1) {
      return step;
    }
  }

  return undefined;
};

const isInterval = (values: number[], step: number) => {
  values.forEach((item, index) => {
    const prev = values[index - 1];
    const value = values[index];
    return value - prev === step;
  });
  return true;
};

const isFullInterval = (values: number[], unit: Unit, step: number) => {
  const min = values[0];
  const max = values[values.length - 1];
  const haveAllValues = values.length === (max - min) / step + 1;

  return min === unit.min && max + step > unit.max && haveAllValues;
};

const formatValue = (
  value: number,
  unit: Unit,
  humanize?: boolean,
  leadingZero?: LeadingZero,
  clockFormat?: ClockFormat
) => {
  let cronPartString = value.toString();
  const { type, alt, min } = unit;
  const needLeadingZero =
    leadingZero && (leadingZero === true || leadingZero.includes(type as any));
  const need24HourClock =
    clockFormat === '24-hour-clock' && (type === 'hours' || type === 'minutes');

  if ((humanize && type === 'week-days') || (humanize && type === 'months')) {
    cronPartString = alt![value - min];
  } else if (value < 10 && (needLeadingZero || need24HourClock)) {
    cronPartString = cronPartString.padStart(2, '0');
  }

  if (type === 'hours' && clockFormat === '12-hour-clock') {
    const suffix = value >= 12 ? 'PM' : 'AM';
    let hour: number | string = value % 12 || 12;

    if (hour < 10 && needLeadingZero) {
      hour = hour.toString().padStart(2, '0');
    }

    cronPartString = `${hour}${suffix}`;
  }

  return cronPartString;
};

const parsePartArray = (arr: number[], unit: Unit) => {
  const values = [...new Set(fixSunday(arr, unit))].sort(dateSort);

  if (values.length === 0) {
    return values;
  }

  const value = outOfRange(values, unit);

  if (typeof value !== 'undefined') {
    throw new Error(`Value "${value}" out of range for ${unit.type}`);
  }

  return values;
};

const toRanges = (values: number[]) => {
  const retval: Array<number[] | number> = [];
  let startPart: number | null = null;

  values.forEach((value, index, self) => {
    if (value !== self[index + 1] - 1) {
      if (startPart !== null) {
        retval.push([startPart, value]);
        startPart = null;
      } else {
        retval.push(value);
      }
    } else if (startPart === null) {
      startPart = value;
    }
  });

  return retval;
};

const partToString = (
  cronPart: number[],
  unit: Unit,
  humanize?: boolean,
  leadingZero?: LeadingZero,
  clockFormat?: ClockFormat
) => {
  let retval = '';

  if (isFull(cronPart, unit) || cronPart.length === 0) {
    retval = '*';
  } else {
    const step = getStep(cronPart);

    if (step && isInterval(cronPart, step)) {
      if (isFullInterval(cronPart, unit, step)) {
        retval = `*/${step}`;
      } else {
        retval = `${formatValue(
          cronPart[0],
          unit,
          humanize,
          leadingZero,
          clockFormat
        )}-${formatValue(
          cronPart[cronPart.length - 1],
          unit,
          humanize,
          leadingZero,
          clockFormat
        )}/${step}`;
      }
    } else {
      retval = toRanges(cronPart)
        .map((range: number | number[]) => {
          if (Array.isArray(range)) {
            return `${formatValue(
              range[0],
              unit,
              humanize,
              leadingZero,
              clockFormat
            )}-${formatValue(
              range[1],
              unit,
              humanize,
              leadingZero,
              clockFormat
            )}`;
          }

          return formatValue(range, unit, humanize, leadingZero, clockFormat);
        })
        .join(',');
    }
  }
  return retval;
};

const parseCronArray = (cronArr: number[][], humanize?: boolean) => {
  if (cronArr.length === 5) {
    return cronArr.map((partArr, idx) => {
      const unit = UNITS[idx];
      const parsedArray = parsePartArray(partArr, unit);
      return partToString(parsedArray, unit, humanize);
    });
  }

  throw new Error('Invalid cron array');
};

const replaceAlternatives = (str: string, min: number, alt?: string[]) => {
  let newStr;
  if (alt) {
    newStr = str.toUpperCase();
    alt.forEach((item, index) => {
      newStr = newStr.replace(alt[index], `${index + min}`);
    });
  }
  return newStr;
};

const parseStep = (step: string, unit: Unit) => {
  if (typeof step !== 'undefined') {
    const parsedStep = parseInt(step, 10);

    if (Number.isNaN(parsedStep) || parsedStep < 1) {
      throw new Error(`Invalid interval step value "${step}" for ${unit.type}`);
    }

    return parsedStep;
  }
  return undefined;
};

const range = (start: number, end: number) => {
  const array: number[] = [];

  /* eslint-disable-next-line no-plusplus */
  for (let i = start; i <= end; i++) {
    array.push(i);
  }

  return array;
};

const parseRange = (rangeStr: string, context: string, unit: Unit) => {
  const subparts = rangeStr.split('-');

  if (subparts.length === 1) {
    const value = parseInt(subparts[0], 10);

    if (Number.isNaN(value)) {
      throw new Error(`Invalid value "${context}" for ${unit.type}`);
    }

    return [value];
  }
  if (subparts.length === 2) {
    const minValue = parseInt(subparts[0], 10);
    const maxValue = parseInt(subparts[1], 10);

    if (maxValue <= minValue) {
      throw new Error(
        `Max range is less than min range in "${rangeStr}" for ${unit.type}`
      );
    }

    return range(minValue, maxValue);
  }
  throw new Error(`Invalid value "${rangeStr}" for ${unit.type}`);
};

const applyInterval = (values: number[], step?: number) => {
  if (step) {
    const minVal = values[0];

    // eslint-disable-next-line no-param-reassign
    values = values.filter((value) => {
      return value % step === minVal % step || value === minVal;
    });
  }

  return values;
};

const parsePartString = (str: string, unit: Unit) => {
  if (str === '*' || str === '*/1') {
    return [];
  }

  const stringParts = str.split('/');

  if (stringParts.length > 2) {
    throw new Error(`Invalid value "${unit.type}"`);
  }

  const rangeString = replaceAlternatives(stringParts[0], unit.min, unit.alt);
  let parsedValues: number[];

  if (rangeString === '*') {
    parsedValues = range(unit.min, unit.max);
  } else {
    parsedValues = [
      ...new Set(
        fixSunday(
          rangeString
            .split(',')
            .map((rangeItem) => {
              return parseRange(rangeItem, str, unit);
            })
            .flat(),
          unit
        )
      ),
    ].sort(dateSort);

    const value = outOfRange(parsedValues, unit);

    if (typeof value !== 'undefined') {
      throw new Error(`Value "${value}" out of range for ${unit.type}`);
    }
  }

  const step = parseStep(stringParts[1], unit);
  const intervalValues = applyInterval(parsedValues, step);

  if (intervalValues.length === unit.total) {
    return [];
  }
  if (intervalValues.length === 0) {
    throw new Error(`Empty interval value "${str}" for ${unit.type}`);
  }

  return intervalValues;
};

export const parseCronString = (str: string) => {
  const parts = str.replace(/\s+/g, ' ').trim().split(' ');

  if (parts.length === 5) {
    return parts.map((partStr, idx) => {
      return parsePartString(partStr, UNITS[idx]);
    });
  }

  throw new Error('Invalid cron string format');
};

export const getPeriodFromCronparts = (cronParts: number[][]): PeriodType => {
  if (cronParts[3].length > 0) {
    return 'year';
  }
  if (cronParts[2].length > 0) {
    return 'month';
  }
  if (cronParts[4].length > 0) {
    return 'week';
  }
  if (cronParts[1].length > 0) {
    return 'day';
  }
  if (cronParts[0].length > 0) {
    return 'hour';
  }
  return 'minute';
};

export const getCronStringFromValues = (
  period: PeriodType,
  months?: number[],
  monthDays?: number[],
  weekDays?: number[],
  hours?: number[],
  minutes?: number[],
  humanizeValue?: boolean
) => {
  const newMonths = period === 'year' && months ? months : [];
  const newMonthDays =
    (period === 'year' || period === 'month') && monthDays ? monthDays : [];
  const newWeekDays =
    (period === 'year' || period === 'month' || period === 'week') && weekDays
      ? weekDays
      : [];
  const newHours =
    period !== 'minute' && period !== 'hour' && hours ? hours : [];
  const newMinutes = period !== 'minute' && minutes ? minutes : [];
  const parsedArray = parseCronArray(
    [newMinutes, newHours, newMonthDays, newMonths, newWeekDays],
    humanizeValue
  );

  return parsedArray.join(' ');
};
