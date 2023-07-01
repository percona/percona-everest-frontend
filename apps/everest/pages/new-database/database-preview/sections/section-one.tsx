import React, { useMemo } from "react";
import { Stack, Typography } from "@mui/material";
import { PreviewSection, PreviewContentText } from "../preview-section";
import { dbTypeToIcon } from "../../../../utils/db";
import { SectionProps } from "./section.types";
import { Messages } from "../database.preview.messages";

export const PreviewSectionOne = ({ dbName, dbVersion, dbType }: SectionProps) => {
  const Icon = useMemo(() => dbTypeToIcon(dbType), [dbType]);

  return (
    <Stack>
      <Stack direction='row' alignItems='center'>
        <Icon fontSize='large' sx={{ mr: 1 }} />
        <Typography variant='subtitle2'>{dbName}</Typography>
      </Stack>
      <PreviewSection title={Messages.preview.version} active>
        <PreviewContentText text={dbVersion} />
      </PreviewSection>
    </Stack>
  );
}