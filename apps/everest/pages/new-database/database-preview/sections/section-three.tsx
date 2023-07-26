import React from 'react';
import { PreviewContentText } from '../preview-section';
import { SectionProps } from './section.types';
import { getTimeSelectionPreviewMessage } from '../database.preview.messages';

export const PreviewSectionThree = (sectionProps: SectionProps) => {
  return (
    <PreviewContentText text={getTimeSelectionPreviewMessage(sectionProps)} />
  );
};
