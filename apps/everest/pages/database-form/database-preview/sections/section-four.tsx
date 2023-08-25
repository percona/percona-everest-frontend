import React from 'react';
import { PreviewContentText } from '../preview-section';
import { SectionProps } from './section.types';

export const PreviewSectionFour = ({ externalAccess, engineParametersEnabled, engineParameters }: SectionProps) => (
  <>
   <PreviewContentText text={`External access ${externalAccess ? 'enabled' : 'disabled'}`} />
   {engineParametersEnabled && engineParameters && (
    <PreviewContentText text="Database engine parameters set" />
   )}
  </>
);
