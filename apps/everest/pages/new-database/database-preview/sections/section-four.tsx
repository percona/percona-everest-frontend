import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionFour = ({ externalAccess, active, hasBeenReached, onSectionEdit }: SectionProps) => {
  return (
    <>
      <PreviewSection
        order={4}
        title={Messages.preview.externalAccess}
        active={active}
        onEditClick={() => onSectionEdit(4)}
        hasBeenReached={hasBeenReached}
      >
        <PreviewContentText text={externalAccess ? 'Enabled' : 'Disabled'} />
      </PreviewSection>
    </>
  );
}