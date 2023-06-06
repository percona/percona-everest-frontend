import React, { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const NewDatabasePage = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel />
        </Step>
        <Step>
          <StepLabel />
        </Step>
        <Step>
          <StepLabel />
        </Step>
      </Stepper>
      <Box>
        Step {activeStep + 1}
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
