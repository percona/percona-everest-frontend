import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Stack } from "@mui/material";
import { Messages } from "../database.preview.messages";

export const PreviewSectionTwo = ({ numberOfNodes, cpu, disk, memory, active }: SectionProps) => {
  return (
    <Stack>
      <PreviewSection title={Messages.preview.numberOfNodes} active={active}>
        <PreviewContentText text={`${numberOfNodes} nodes`} />
      </PreviewSection>
      <PreviewSection title={Messages.preview.resourceSize} active={active}>
        <PreviewContentText text={`CPU - ${cpu} CPU`} />
        <PreviewContentText text={`Memory - ${memory} GB`} />
        <PreviewContentText text={`Disk - ${disk} GB`} />
      </PreviewSection>
    </Stack>
  );
}