import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";

export const PreviewSectionFive = ({ monitoring, active }: SectionProps) => {
  return (
    <>
      <PreviewSection title='MONITORING' active={active}>
        <PreviewContentText text={!!monitoring ? 'Enabled' : 'Disabled'} />
      </PreviewSection>
    </>
  );
}