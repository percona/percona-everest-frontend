import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { beautifyDbTypeName } from "../../../../utils/db";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionOne = ({ dbName, dbVersion, dbType }: SectionProps) => {
  return (
    <PreviewSection title={Messages.preview.basic} active>
      <PreviewContentText text={`Type: ${beautifyDbTypeName(dbType)}`} />
      <PreviewContentText text={`Name: ${dbName}`} />
      <PreviewContentText text={`Version: ${dbVersion}`} />
    </PreviewSection>
  );
}