import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionFour = ({ externalAccess, active }: SectionProps) => {
  return (
    <>
      <PreviewSection title={Messages.preview.externalAccess} active={active}>
        <PreviewContentText text={externalAccess ? 'Enabled' : 'Disabled'} />
      </PreviewSection>
    </>
  );
}