import { PreviewContentText } from '../preview-section';
import { AdvancedConfigurationType } from '../../database-form.types';

export const AdvancedConfigurationsPreviewSection = ({
  externalAccess,
  engineParametersEnabled,
  engineParameters,
}: AdvancedConfigurationType) => (
  <>
    <PreviewContentText
      text={`External access ${externalAccess ? 'enabled' : 'disabled'}`}
    />
    {engineParametersEnabled && engineParameters && (
      <PreviewContentText text="Database engine parameters set" />
    )}
  </>
);
