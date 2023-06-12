import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import React, { useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Messages } from './new-database.messages';
import { dbWizardSchema, DbWizardType } from './new-database.types';
import { steps } from './steps';

export const NewDatabasePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const currentValidationSchema = dbWizardSchema[activeStep];

  const methods = useForm<DbWizardType>({
    mode: 'onChange',
    resolver: zodResolver(currentValidationSchema),
    defaultValues: {
      dbType: DbType.Postresql,
      backupsEnabled: true,
      pitrEnabled: true,
      pitrTime: 60,
      storageLocation: '',
      timeOf: 1,
      selectTime: 'hours',
      minute: 0,
      hour: 0,
      amPm: 'AM',
      weekDay: 'Monday',
      onDay: 1,
    },
  });
  const firstStep = activeStep === 0;

  const onSubmit: SubmitHandler<DbWizardType> = (data) => {
    console.log(data);
  };

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
