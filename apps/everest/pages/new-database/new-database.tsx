import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Divider, Drawer, Stack, Step, StepLabel, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Stepper } from '@percona/ui-lib.stepper';
import React, { useMemo, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Messages } from './new-database.messages';
import {
  dbWizardSchema,
  DbWizardType,
} from './new-database.types';
import { steps } from './steps';
import { SixthStep } from './steps/sixth/sixth-step';
import { useCreateDbCluster } from '../../hooks/db-cluster/useDbCluster';
import { useSelectedKubernetesCluster } from '../../hooks/kubernetesClusters/useSelectedKubernetesCluster';
import { DatabasePreview } from './database-preview/database-preview';
import { DB_WIZARD_DEFAULTS } from './new-database.constants';

export const NewDatabasePage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const currentValidationSchema = dbWizardSchema[activeStep];
  const { mutate: addDbCluster } = useCreateDbCluster();
  const { id } = useSelectedKubernetesCluster();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  const methods = useForm<DbWizardType>({
    mode: 'onChange',
    resolver: zodResolver(currentValidationSchema),
    defaultValues: DB_WIZARD_DEFAULTS,
  });
  const firstStep = activeStep === 0;

  const onSubmit: SubmitHandler<DbWizardType> = (data) => {
    /* eslint-disable no-console */
    // TODO based on data.dbType, get the engine from context and the desired proxy version, if needed
    console.log(data);
    addDbCluster(
      { dbPayload: data, id },
      {
        onSuccess: () => {
          setFormSubmitted(true);
        },
      }
    );
  };

  const handleNext: React.MouseEventHandler<HTMLButtonElement> = async () => {
    if (activeStep < steps.length - 1) {
      const isStepValid = await methods.trigger();

      if (isStepValid) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const handleSectionEdit = (order: number) => setActiveStep(order - 1);

  const PreviewContent = useMemo(() => (
    <DatabasePreview
      activeStep={activeStep}
      onSectionEdit={handleSectionEdit}
      sx={{
        mt: 2,
        ...(!isDesktop && {
          padding: 0
        }),
      }}
    />
  ), [activeStep, isDesktop]);

  return formSubmitted ? (
    <SixthStep />
  ) : (
    <>
      <Stepper noConnector activeStep={activeStep} sx={{ marginBottom: 4 }}>
        {steps.map((_, idx) => (
          <Step key={`step-${idx + 1}`}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
      <FormProvider {...methods}>
        <Stack direction={isDesktop ? 'row' : 'column'}>
          <form style={{ flexGrow: 1 }} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box>{React.createElement(steps[activeStep])}</Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
              <Button
                type="button"
                startIcon={<ArrowBackIcon />}
                variant="text"
                disabled={firstStep}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                {Messages.previous}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={methods.handleSubmit(onSubmit)}
                  variant="contained"
                >
                  {Messages.createDatabase}
                </Button>
              ) : (
                <Button onClick={handleNext} variant="contained">
                  {Messages.continue}
                </Button>
              )}
            </Box>
          </form>
          {
            isDesktop ? (
              <Drawer
                variant='permanent'
                anchor='right'
                sx={{
                  width: '25%',
                  flexShrink: 0,
                  ml: 3,
                  [`& .MuiDrawer-paper`]: {
                    width: '25%',
                    boxSizing: 'border-box',
                  },
                }}
              >
                <Toolbar />
                {PreviewContent}
              </Drawer>
            ) : (
              <>
                <Divider
                  orientation='horizontal'
                  flexItem
                  sx={{
                    // This is a little tweak
                    // We make the divider longer, adding the main padding value
                    // Then, to make it begin before the main padding, we add a negative margin
                    // This way, the divider will cross the whole section
                    width: `calc(100% + ${theme.spacing(4 * 2)})`,
                    ml: -4,
                    mt: 6
                  }}
                />
                {PreviewContent}
              </>
            )
          }
        </Stack>
      </FormProvider>
    </>
  );
};
