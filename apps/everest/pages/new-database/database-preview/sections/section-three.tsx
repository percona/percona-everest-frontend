import React from "react";
import { PreviewContentText } from "../preview-section";
import {SectionProps} from "./section.types";
import {getCronStringFromValues} from "../../../../components/time-selection/utils/cron";
import {AmPM, TimeValue, WeekDays} from "../../../../components/time-selection/time-selection.types";
import {WEEKDAYS} from "../../../../components/time-selection/utils/cron.constants";
import {getEnumKeyByEnumValue} from "../../../../utils/enums";
import cronstrue from 'cronstrue';

export const PreviewSectionThree = ({onDay, weekDay, selectTime, hour, minute, amPm}: SectionProps) => {
      const hour24 = amPm===AmPM.PM? hour===12? 0:hour+12 : hour;
      const weekDayNumbers = selectTime===TimeValue.months? [] : [WEEKDAYS.indexOf(getEnumKeyByEnumValue(WeekDays, weekDay).toUpperCase())];
      const cronExpression = getCronStringFromValues(selectTime!, [], [onDay], weekDayNumbers, [hour24], [minute]);
      return (
          <PreviewContentText text={cronstrue.toString(cronExpression, { use24HourTimeFormat: true })} />
      )
}
