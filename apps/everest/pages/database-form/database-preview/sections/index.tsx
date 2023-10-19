import { PreviewSectionFive } from './section-five';
import { AdvancedConfigurationsPreviewSection } from './advanced-configurations-section';
import { PreviewSectionOne } from './section-one';
import { BackupsPreviewSection } from './backups-section';
import { PreviewSectionTwo } from './section-two';

export {
  PreviewSectionOne,
  PreviewSectionTwo,
  BackupsPreviewSection,
  AdvancedConfigurationsPreviewSection,
  PreviewSectionFive,
};

// TODO re-add steps after API is ready
export const previewSections = [
  PreviewSectionOne,
  PreviewSectionTwo,
  // PreviewSectionThree,
  AdvancedConfigurationsPreviewSection,
  PreviewSectionFive,
];
