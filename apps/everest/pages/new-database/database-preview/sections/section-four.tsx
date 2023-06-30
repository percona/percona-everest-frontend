import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";

export const PreviewSectionFour = ({ externalAccess, active }: SectionProps) => {
  return (
    <>
      <PreviewSection title='EXTERNAL ACCESS' active={active}>
        <PreviewContentText text={!!externalAccess ? 'Enabled' : 'Disabled'} />
      </PreviewSection>
    </>
  );
}