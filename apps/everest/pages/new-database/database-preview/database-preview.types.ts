import { StackProps } from "@mui/material";

export type DatabasePreviewProps = {
  activeStep: number;
  nrSteps: number;
  onSectionEdit: (order: number) => void;
} & StackProps;

export type PreviewSectionProps  = {
  title: string;
  order: number;
  children: React.ReactNode;
  active?: boolean;
  hasBeenReached?: boolean;
  onEditClick?: () => void;
} & StackProps;

export type PreviewContentTextProps = {
  text: string;
}
