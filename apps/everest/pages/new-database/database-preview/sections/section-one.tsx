import React, { useMemo } from "react";
import { Stack, Typography } from "@mui/material";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { dbTypeToIcon } from "../../../../utils/db";
import { SectionProps } from "./section.types";

export const PreviewSectionOne = ({ dbName, dbVersion, dbType }: SectionProps) => {
  const Icon = useMemo(() => dbTypeToIcon(dbType), [dbType]);

  return (
    <Stack sx={{ order: 1 }}>
      <Stack direction='row' alignItems='center'>
        <Icon fontSize='large' sx={{ mr: 1 }} />
        <Typography variant='subtitle2'>{dbName}</Typography>
      </Stack>
      <PreviewSection title='VERSION' active>
        <PreviewContentText text={dbVersion} />
      </PreviewSection>
    </Stack>
  );
}