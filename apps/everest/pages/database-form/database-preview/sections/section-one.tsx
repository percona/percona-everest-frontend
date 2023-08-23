import React from 'react';
import { PreviewContentText } from '../preview-section';
import { beautifyDbTypeName } from '../../../../utils/db';
import { SectionProps } from './section.types';

export const PreviewSectionOne = ({
  dbName,
  dbVersion,
  dbType,
  storageClass,
}: SectionProps) => (
  <>
    <PreviewContentText text={`Type: ${beautifyDbTypeName(dbType)}`} />
    <PreviewContentText text={`Name: ${dbName}`} />
    <PreviewContentText text={`Version: ${dbVersion}`} />
    <PreviewContentText text={`Storage class: ${storageClass ?? ''}`} />
  </>
);
