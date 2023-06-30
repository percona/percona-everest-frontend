import React from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { DatabasePreviewProps } from './database-preview.types';
import { DbWizardType } from '../new-database.types';
import { previewSections, PreviewSectionOne } from './sections';
import { calculateDividerOrder } from './database-preview.utils';

export const DatabasePreview = ({ longestAchievedStep, finalStepAchieved, ...stackProps }: DatabasePreviewProps) => {
  const { getValues } = useFormContext<DbWizardType>();
  const dividerOrder = calculateDividerOrder(longestAchievedStep);

  // Under normal circumstances, useWatch should return the right values
  // But the initial setValue are not taking effect
  // So we just call useWatch to cause a re-render, and get the values from getValues
  useWatch();

  const values = getValues();

  return (
    <Stack {...stackProps}>
      <Typography fontStyle='italic' color='text.secondary'>Database Preview</Typography>
      <Stack>
        <PreviewSectionOne {...values} />
        {!finalStepAchieved && <Divider sx={{ mt: 1.5, mb: 1, order: dividerOrder }} />}
        {previewSections.map((Section, idx) => <Section {...values} active={longestAchievedStep > idx} key={`section-${idx}`} />)}
      </Stack>
    </Stack>
  );
}