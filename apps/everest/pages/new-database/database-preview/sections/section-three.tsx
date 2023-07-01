import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionThree = ({ active }: SectionProps) => {
  return (
    <PreviewSection title={Messages.preview.backups} active={active}>
      <PreviewContentText text='Daily at 1 AM' />
    </PreviewSection>
  );
}