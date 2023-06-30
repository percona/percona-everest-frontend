import { StackProps } from "@mui/material";

export type DatabasePreviewProps = {
  activeStep: number;
  nrSteps: number;
} & StackProps;

export type PreviewSectionProps  = {
  title: string;
  children: React.ReactNode;
  active?: boolean;
} & StackProps;

export type PreviewContentTextProps = {
  text: string;
}
