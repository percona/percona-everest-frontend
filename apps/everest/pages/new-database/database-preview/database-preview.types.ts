import { StackProps } from "@mui/material";

export type DatabasePreviewProps = {
  longestAchievedStep: number;
  finalStepAchieved: boolean;
} & StackProps;

export type PreviewSectionProps  = {
  title: string;
  children: React.ReactNode;
  active?: boolean;
} & StackProps;

export type PreviewContentTextProps = {
  text: string;
}
