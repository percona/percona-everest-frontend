import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm, SubmitHandler } from "react-hook-form";
import { steps } from './steps';

type Inputs = {
  example: string,
};

export const NewDatabasePage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = data => console.log(data);

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    // Submit
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
          steps.map(() => (
            <Step>
              <StepLabel />
            </Step>
          ))
        }
      </Stepper>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {React.createElement(steps[activeStep])}
        </form>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          variant='text'
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ mr: 1 }}
        >
          Previous
        </Button>
        <Box sx={{ flex: '1 1 auto' }} />
        <Button onClick={handleNext} variant='contained'>
          Continue
        </Button>
      </Box>
    </>
  );
};
