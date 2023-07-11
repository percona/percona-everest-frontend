import React, { useEffect, useState } from 'react';
import { Divider, Stack, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { DatabasePreviewProps } from './database-preview.types';
import { DbWizardType } from '../new-database.types';
import { previewSections } from './sections';
import { Messages } from './database.preview.messages';

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
      <Typography variant='overline'>
        {Messages.title}
      </Typography>
      <Stack>
        {previewSections.map((Section, idx) => (
          // The array is static, we can disable the rule
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={`section-${idx}`}>
            <Section {...values} hasBeenReached={longestAchievedStep > idx - 1} active={activeStep === idx} />
            {!finalStepAchieved && longestAchievedStep === idx && <Divider sx={{ mt: 1.5, mb: 1 }} />}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
}