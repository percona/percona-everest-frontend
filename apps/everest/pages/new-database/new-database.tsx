import React, { useState } from 'react';
import { Box, Button, Step, StepLabel } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stepper } from '@percona/ui-lib.stepper';
import { steps } from './steps';
import { Messages } from './new-database.messages';
import { DbWizardType, dbWizardSchema } from './new-database.types';
import { BasicInformationFields } from './steps/first/first-step.types';

export const NewDatabasePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = dbWizardSchema[activeStep];

  const methods = useForm<DbWizardType>({
    mode: 'onChange',
    resolver: zodResolver(currentValidationSchema),
    defaultValues: {
      [BasicInformationFields.dbType]: DbType.Mysql,
      [BasicInformationFields.dbName]: '',
      [BasicInformationFields.k8sNamespace]: '',
      [BasicInformationFields.dbEnvironment]: '',
      [BasicInformationFields.dbVersion]: '',
      externalAccess: false,
      internetFacing: true,
      sourceRange: '',
      monitoring: false,
      endpoint: '',
    },
  });
  const firstStep = activeStep === 0;

  const onSubmit: SubmitHandler<DbWizardType> = (data) => {
    /* eslint-disable no-console */
    console.log(data);
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

  return (
    <>
      <Stepper noConnector activeStep={activeStep} sx={{ marginBottom: 4 }}>
        {steps.map((_, idx) => (
          <Step key={`step-${idx + 1}`}>
            <StepLabel />
          </Step>
        ))}
      </Stepper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box>{React.createElement(steps[activeStep])}</Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
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
      </FormProvider>
    </>
  );
};
