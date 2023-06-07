import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DbType } from '@percona/ui-lib.db-toggle-card';
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { steps } from './steps';
import { Messages } from './new-database.messages';

type Inputs = {
  dbType: DbType,
  externalAccess: boolean;
};

export const NewDatabasePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const methods = useForm<Inputs>({
    defaultValues: {
      dbType: DbType.Postresql,
      externalAccess: false,
    }
  });
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
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
      <Box>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {React.createElement(steps[activeStep])}
          </form>
        </FormProvider>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant='text'
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          {Messages.previous}
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button type='button' onClick={handleNext} variant='contained'>
          {Messages.continue}
        </Button>
      </Box>
    </>
  );
};
