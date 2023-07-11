import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionThree = ({ active, hasBeenReached, onSectionEdit }: SectionProps) => {
  return (
    <PreviewSection
      order={3}
      title={Messages.preview.backups}
      active={active}
      onEditClick={() => onSectionEdit(3)}
      hasBeenReached={hasBeenReached}
    >
      <PreviewContentText text='Daily at 1 AM' />
    </PreviewSection>
  );
}