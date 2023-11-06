import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useFormContext, useWatch } from 'react-hook-form';
import { DatabasePreviewProps } from './database-preview.types';
import { DbWizardType } from '../database-form.types';
import { previewSections } from './sections/constants';
import { Messages } from './database.preview.messages';
import { PreviewSection } from './preview-section';

export const DatabasePreview = ({
  activeStep,
  onSectionEdit = () => {},
  sx,
  ...stackProps
}: DatabasePreviewProps) => {
  const { getValues } = useFormContext<DbWizardType>();
  const [longestAchievedStep, setLongestAchievedStep] = useState(activeStep);

  useEffect(() => {
    if (activeStep > longestAchievedStep) {
      setLongestAchievedStep(activeStep);
    }
  }, [activeStep, longestAchievedStep]);

  // Under normal circumstances, useWatch should return the right values
  // But the initial setValue are not taking effect
  // So we just call useWatch to cause a re-render, and get the values from getValues
  useWatch();

  const values = getValues();

  return (
    <Stack sx={{ pr: 2, pl: 2, ...sx }} {...stackProps}>
      <Typography variant="overline">{Messages.title}</Typography>
      <Stack>
        {previewSections.map((Section, idx) => (
          <React.Fragment key={`section-${idx + 1}`}>
            <PreviewSection
              order={idx + 1}
              title={Messages.preview[idx]}
              hasBeenReached={longestAchievedStep >= idx}
              active={activeStep === idx}
              onEditClick={() => onSectionEdit(idx + 1)}
              sx={{
                mt: idx === 0 ? 2 : 0,
              }}
            >
              <Section {...values} />
            </PreviewSection>
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
};
