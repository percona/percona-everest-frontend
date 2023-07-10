import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionFive = ({ monitoring, active }: SectionProps) => {
  return (
    <>
      <PreviewSection title={Messages.preview.monitoring} active={active}>
        <PreviewContentText text={monitoring ? 'Enabled' : 'Disabled'} />
      </PreviewSection>
    </>
  );
}