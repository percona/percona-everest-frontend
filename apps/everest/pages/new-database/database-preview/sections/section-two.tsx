import React from "react";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Stack } from "@mui/material";

export const PreviewSectionTwo = ({ numberOfNodes, cpu, disk, memory, active }: SectionProps) => {
  return (
    <Stack sx={{ order: 3 }}>
      <PreviewSection title='NUMBER OF NODES' active={active}>
        <PreviewContentText text={`${numberOfNodes} nodes`} />
      </PreviewSection>
      <PreviewSection title='RESOURCE SIZE' active={active}>
        <PreviewContentText text={`CPU - ${cpu} CPU`} />
        <PreviewContentText text={`Memory - ${memory} GB`} />
        <PreviewContentText text={`Disk - ${disk} GB`} />
      </PreviewSection>
    </Stack>
  );
}