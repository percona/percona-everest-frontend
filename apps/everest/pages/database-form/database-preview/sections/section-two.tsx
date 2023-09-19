import React from 'react';
import { PreviewContentText } from '../preview-section';
import { SectionProps } from './section.types';

export const PreviewSectionTwo = ({
  numberOfNodes,
  cpu,
  disk,
  memory,
}: SectionProps) => {
  const parsedCPU = Number(cpu);
  const parsedDisk = Number(disk);
  const parsedMemory = Number(memory);

  return (
    <>
      <PreviewContentText text={`Number of nodes: ${numberOfNodes}`} />
      <PreviewContentText text={`CPU: ${isNaN(parsedCPU) ? '' : parsedCPU + ' CPU'}`} />
      <PreviewContentText text={`Memory: ${isNaN(parsedMemory) ? '' : parsedMemory + ' GB'}`} />
      <PreviewContentText text={`Disk: ${isNaN(parsedDisk) ? '':  parsedDisk + ' GB'}`} />
    </>
  );
};
