import React from 'react';
import { PreviewContentText } from '../preview-section';
import { getTimeSelectionPreviewMessage } from '../database.preview.messages';
import { BackupsStepType } from '../../database-form.types';

export const BackupsPreviewSection = (backupsSection: BackupsStepType) => {
  const { selectedTime, hour, minute, amPm, weekDay, onDay } = backupsSection;
  return (
    <PreviewContentText
      text={getTimeSelectionPreviewMessage({
        selectedTime,
        minute,
        hour,
        amPm,
        onDay,
        weekDay,
      })}
    />
  );
};
