import React from "react";
import { PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";

export const PreviewSectionFour = ({ externalAccess }: SectionProps) => (
  <PreviewContentText text={externalAccess ? 'Enabled' : 'Disabled'} />
)
