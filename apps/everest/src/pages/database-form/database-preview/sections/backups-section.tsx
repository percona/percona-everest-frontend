import { PreviewContentText } from '../preview-section';
import { getTimeSelectionPreviewMessage } from '../database.preview.messages';
import { BackupStepType } from '../../database-form-schema.ts';

export const BackupsPreviewSection = (backupsSection: BackupStepType) => {
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
