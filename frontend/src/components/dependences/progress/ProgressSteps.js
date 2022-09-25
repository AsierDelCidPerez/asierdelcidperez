import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';


export default function useProgressSteps({steps}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step.optional;
  };

  const resetSteps = () => {
    setActiveStep(0)
  }

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getProgressSteps = () => (
    <Box sx={{ width: '100%', display: {xs: 'none', s: 'none', md: 'block'} }}>
    <Stepper activeStep={activeStep}>
      {steps.map((label, index) => {
        const stepProps = {};
        const labelProps = {};
        if (isStepOptional(label)) {
          labelProps.optional = (
            <Typography variant="caption">Opcional</Typography>
          );
        }
        if (isStepSkipped(index)) {
          stepProps.completed = false;
        }
        return (
          <Step key={label.id} {...stepProps}>
            <StepLabel {...labelProps}>{label.name}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
    {activeStep === steps.length ? (
      <React.Fragment>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Box sx={{ flex: '1 1 auto' }} />
        </Box>
      </React.Fragment>
    )}
  </Box>
  )

  return {
    getProgressSteps, handleNext, handleBack, activeStep, resetSteps
  }
}