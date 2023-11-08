import { beautifyDbTypeName } from '@percona/utils';
import { PreviewContentText } from '../preview-section';
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
