import { TypographyProps } from "@mui/material";

export type LabeledContentProps = {
  label: string;
  children?: React.ReactNode;
} & TypographyProps;
