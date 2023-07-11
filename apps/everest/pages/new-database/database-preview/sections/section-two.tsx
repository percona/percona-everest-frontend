import React from "react";
import { Stack } from "@mui/material";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionTwo = ({ numberOfNodes, cpu, disk, memory, active, hasBeenReached }: SectionProps) => {
  return (
    <PreviewSection order={2} title={Messages.preview.resourceSize} active={active} hasBeenReached={hasBeenReached}>
      <PreviewContentText text={`Number of nodes: ${numberOfNodes}`} />
      <PreviewContentText text={`CPU: ${cpu} CPU`} />
      <PreviewContentText text={`Memory: ${memory} GB`} />
      <PreviewContentText text={`Disk: ${disk} GB`} />
    </PreviewSection>
  );
}