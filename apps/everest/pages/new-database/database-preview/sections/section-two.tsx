import React from "react";
import { PreviewContentText } from "../preview-section";
import { SectionProps } from "./section.types";

export const PreviewSectionTwo = ({
  numberOfNodes,
  cpu,
  disk,
  memory,
}: SectionProps) => (
  <>
    <PreviewContentText text={`Number of nodes: ${numberOfNodes}`} />
    <PreviewContentText text={`CPU: ${cpu} CPU`} />
    <PreviewContentText text={`Memory: ${memory} GB`} />
    <PreviewContentText text={`Disk: ${disk} GB`} />
  </>
)
