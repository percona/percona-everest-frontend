import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  Step,
  StepLabel,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Stepper } from '@percona/ui-lib.stepper';
import React, { useMemo, useState, useEffect } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Messages } from './database-form.messages';
import { dbWizardSchema, DbWizardType } from './database-form.types';
import { steps } from './steps';

import { SixthStep } from './steps/sixth/sixth-step';
import { useCreateDbCluster } from '../../hooks/api/db-cluster/useCreateDbCluster';
import { useSelectedKubernetesCluster } from '../../hooks/api/kubernetesClusters/useSelectedKubernetesCluster';
import { DatabasePreview } from './database-preview/database-preview';
import { useDatabasePageMode } from './useDatabasePageMode';
import { useDatabasePageDefaultValues } from './useDatabaseFormDefaultValues';
import { useSelectedDBCluster } from '../../hooks/db-cluster/useSelectedDBCluster';
import { useUpdateDbCluster } from '../../hooks/api/db-cluster/useUpdateDbCluster';

export const DatabasePage = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const currentValidationSchema = dbWizardSchema[activeStep];
  const { mutate: addDbCluster } = useCreateDbCluster();
  const { mutate: editDBCluster } = useUpdateDbCluster();
  const { id } = useSelectedKubernetesCluster();
  const { setSelectedDBClusterName } = useSelectedDBCluster();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const mode = useDatabasePageMode();
  const { defaultValues, dbClusterData, dbClusterStatus } =
    useDatabasePageDefaultValues(mode);

  useEffect(() => {
    return () => {
      setSelectedDBClusterName('');
    };
  }, []);

  const methods = useForm<DbWizardType>({
    mode: 'onChange',
    resolver: zodResolver(currentValidationSchema),
    defaultValues,
  });

  useEffect(() => {
    methods.reset(defaultValues);
  }, [defaultValues]);

  const firstStep = activeStep === 0;

  const onSubmit: SubmitHandler<DbWizardType> = (data) => {
    if (mode === 'new') {
      addDbCluster(
        { dbPayload: data, id },
        {
          onSuccess: () => {
            setFormSubmitted(true);
          },
        }
      );
    }
    if (mode === 'edit') {
      editDBCluster(
        { k8sClusterId: id, dbPayload: data, dbCluster: dbClusterData },
        {
          onSuccess: () => {
            setFormSubmitted(true);
          },
        }
      );
    }
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

  const PreviewContent = useMemo(
    () => (
      <DatabasePreview
        activeStep={activeStep}
        onSectionEdit={handleSectionEdit}
        sx={{
          mt: 2,
          ...(!isDesktop && {
            padding: 0,
          }),
        }}
      />
    ),
    [activeStep, isDesktop]
  );

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
          <form
            style={{ flexGrow: 1 }}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Box>
              {(mode === 'new' ||
                (mode === 'edit' && dbClusterStatus === 'success')) &&
                React.createElement(steps[activeStep])}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
              <Button
                type="button"
                startIcon={<ArrowBackIcon />}
                variant="text"
                disabled={firstStep}
                onClick={handleBack}
                sx={{ mr: 1 }}
                data-testid="db-wizard-previous-button"
              >
                {Messages.previous}
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              {activeStep === steps.length - 1 ? (
                <Button
                  onClick={methods.handleSubmit(onSubmit)}
                  variant="contained"
                  data-testid="db-wizard-submit-button"
                >
                  {mode === 'edit'
                    ? Messages.editDatabase
                    : Messages.createDatabase}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  data-testid="db-wizard-continue-button"
                >
                  {Messages.continue}
                </Button>
              )}
            </Box>
          </form>
          {isDesktop ? (
            <Drawer
              variant="permanent"
              anchor="right"
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
                orientation="horizontal"
                flexItem
                sx={{
                  // This is a little tweak
                  // We make the divider longer, adding the main padding value
                  // Then, to make it begin before the main padding, we add a negative margin
                  // This way, the divider will cross the whole section
                  width: `calc(100% + ${theme.spacing(4 * 2)})`,
                  ml: -4,
                  mt: 6,
                }}
              />
              {PreviewContent}
            </>
          )}
        </Stack>
      </FormProvider>
    </>
  );
};
