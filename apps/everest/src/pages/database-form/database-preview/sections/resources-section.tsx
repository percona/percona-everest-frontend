import { PreviewContentText } from '../preview-section';
import { SectionProps } from './section.types';

export const ResourcesPreviewSection = ({
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
      <PreviewContentText
        text={`CPU: ${Number.isNaN(parsedCPU) ? '' : `${parsedCPU} CPU`}`}
      />
      <PreviewContentText
        text={`Memory: ${
          Number.isNaN(parsedMemory) ? '' : `${parsedMemory} GB`
        }`}
      />
      <PreviewContentText
        text={`Disk: ${Number.isNaN(parsedDisk) ? '' : `${parsedDisk} GB`}`}
      />
    </>
  );
};
