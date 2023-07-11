import { StackProps } from "@mui/material";

export type DatabasePreviewProps = {
  activeStep: number;
  nrSteps: number;
} & StackProps;

export type PreviewSectionProps  = {
  title: string;
  order: number;
  children: React.ReactNode;
  active?: boolean;
  hasBeenReached?: boolean;
} & StackProps;

export type PreviewContentTextProps = {
  text: string;
}
