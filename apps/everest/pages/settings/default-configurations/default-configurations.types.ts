import { z } from 'zod';
import {
  AmPM,
  TimeValue,
  WeekDays,
} from '../../../components/time-selection/time-selection.types';
import { IP_RANGE_PATTERN } from './source-ranges/source-range.constants';

export enum DefaultConfigurationsFields {
  monitoring = 'monitoring',
  backupsEnabled = 'backupsEnabled',
  externalAccess = 'externalAccess',
  sourceRanges = 'sourceRanges',
  timeNumbers = 'timeNumbers',
  selectTime = 'selectTime',
  minute = 'minute',
  minuteHour = 'minuteHour',
  hour = 'hour',
  amPm = 'amPm',
  weekDay = 'weekDay',
  onDay = 'onDay',
}

export const defaultConfigurationsSchema = z
  .object({
    [DefaultConfigurationsFields.monitoring]: z.boolean(),
    [DefaultConfigurationsFields.backupsEnabled]: z.boolean(),
    [DefaultConfigurationsFields.externalAccess]: z.boolean(),
    [DefaultConfigurationsFields.timeNumbers]: z.string(),
    [DefaultConfigurationsFields.selectTime]: z.nativeEnum(TimeValue),
    [DefaultConfigurationsFields.minuteHour]: z.number(),
    [DefaultConfigurationsFields.minute]: z.number(),
    [DefaultConfigurationsFields.hour]: z.number(),
    [DefaultConfigurationsFields.amPm]: z.nativeEnum(AmPM),
    [DefaultConfigurationsFields.weekDay]: z.nativeEnum(WeekDays),
    [DefaultConfigurationsFields.onDay]: z.number(),
    [DefaultConfigurationsFields.sourceRanges]: z.array(
      z.object({ sourceRange: z.string().regex(IP_RANGE_PATTERN) })
    ),
  })
  .passthrough();

export type DefaultConfigurationsType = z.infer<
  typeof defaultConfigurationsSchema
>;
