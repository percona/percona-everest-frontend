import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { steps } from './steps';
import { Messages } from './new-database.messages';
import { DbWizardType, dbWizardSchema } from './new-database.types';

export const NewDatabasePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = dbWizardSchema[activeStep];
  const methods = useForm<DbWizardType>({
    mode: 'onChange',
    resolver: zodResolver(currentValidationSchema),
    defaultValues: {
      dbType: DbType.Postresql,
    }
  });
  const firstStep = activeStep === 0;

  const onSubmit: SubmitHandler<DbWizardType> = data => {
    console.log(data);
  }

  const handleNext: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
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
      <Stepper activeStep={activeStep} sx={{ marginBottom: 4 }}>
        {
          steps.map((_, idx) => (
            <Step key={`step-${idx + 1}`}>
              <StepLabel />
            </Step>
          ))
        }
      </Stepper>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box>
            {React.createElement(steps[activeStep])}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              type='button'
              startIcon={<ArrowBackIcon />}
              variant='text'
              disabled={firstStep}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              {Messages.previous}
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {
              activeStep === steps.length - 1 ? (
                <Button
                  onClick={methods.handleSubmit(onSubmit)}
                  variant='contained'
                >
                  {Messages.createDatabase}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  variant='contained'
                >
                  {Messages.continue}
                </Button>
              )
            }
          </Box>
        </form>
      </FormProvider>
    </>
  );
};
