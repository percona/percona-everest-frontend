import React, { useEffect, useState } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { DatabasePreviewProps } from './database-preview.types';
import { DbWizardType } from '../new-database.types';
import { previewSections } from './sections';

export const DatabasePreview = ({ activeStep, nrSteps, sx, ...stackProps }: DatabasePreviewProps) => {
  const { getValues } = useFormContext<DbWizardType>();
  const [longestAchievedStep, setLongestAchievedStep] = useState(activeStep);
  const finalStepAchieved = longestAchievedStep === nrSteps - 1

  useEffect(() => {
    if (activeStep > longestAchievedStep) {
      setLongestAchievedStep(activeStep);
    }
  }, [activeStep]);

  // Under normal circumstances, useWatch should return the right values
  // But the initial setValue are not taking effect
  // So we just call useWatch to cause a re-render, and get the values from getValues
  useWatch();

  const values = getValues();

  return (
    <Stack sx={{ pr: 2, pl: 2, ...sx }} {...stackProps}>
      <Typography fontStyle='italic' color='text.secondary' fontSize='12px'>Database Preview</Typography>
      <Stack sx={{ pt: 1, pb: 1 }}>
        {previewSections.map((Section, idx) => (
          <React.Fragment key={`section-${idx}`}>
            <Section {...values} active={longestAchievedStep > idx - 1} />
            {!finalStepAchieved && longestAchievedStep === idx && <Divider sx={{ mt: 1.5, mb: 1 }} />}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
}