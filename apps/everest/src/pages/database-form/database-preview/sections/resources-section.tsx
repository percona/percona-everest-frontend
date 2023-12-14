import { PreviewContentText } from '../preview-section';
import { SectionProps } from './section.types';

export const ResourcesPreviewSection = ({
  numberOfNodes: numberOfNodesFieldValue,
  cpu,
  disk,
  memory,
}: SectionProps) => {
  const numberOfNodes = Number(numberOfNodesFieldValue);
  const parsedCPU = Number(cpu) * numberOfNodes;
  const parsedDisk = Number(disk) * numberOfNodes;
  const parsedMemory = Number(memory) * numberOfNodes;

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
