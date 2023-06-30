import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";

export const PreviewSectionThree = ({ active }: SectionProps) => {
  return (
    <PreviewSection title='BACKUPS' active={active}>
      <PreviewContentText text='Daily at 1 AM' />
    </PreviewSection>
  );
}