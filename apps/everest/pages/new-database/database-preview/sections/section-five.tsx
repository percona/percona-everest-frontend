import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionFive = ({ monitoring, active, hasBeenReached }: SectionProps) => {
  return (
    <>
      <PreviewSection order={5} title={Messages.preview.monitoring} active={active} hasBeenReached={hasBeenReached}>
        <PreviewContentText text={monitoring ? 'Enabled' : 'Disabled'} />
      </PreviewSection>
    </>
  );
}