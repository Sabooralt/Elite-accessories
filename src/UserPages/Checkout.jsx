import {
  Box,
  Button,
  Container,
  Divider,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useState } from "react";
import { Billing, OverView, Shipping } from "./CheckoutComponents";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
  { title: "Shipping", description: "Shipping Address", component: <Shipping /> },
  { title: "Payment", description: "Payment Method" },
  { title: "Summary", description: "Order Summary" },
];

export const Checkout = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Handle final step logic (e.g., submitting the form)
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep === 0) {
      // Handle going back from the first step (optional)
    } else {
      setActiveStep(activeStep - 1);
    }
    console.log(activeStep);
  };

  const renderComponentForStep = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Shipping />;
      case 1:
        return <Billing />;
      case 2:
        return <OverView />;
      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      placeItems="center"
      width='100%'
      flexDir='row'
      justifyContent='space-around'
      alignItems='start'
     
      border="1px solid #000"
      px={10}
      py={5}
      height='80vh'
    >
      <Stepper height='100%' size="lg" orientation="vertical" index={activeStep}>
        {steps.map((step, index) => (
          <Step key={index} onClick={() => setActiveStep(index)}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            <Box flexShrink="0">
              <StepTitle>{step.title}</StepTitle>
              <StepDescription>{step.description}</StepDescription>
            </Box>

            <StepSeparator />
          </Step>
        ))}
      </Stepper>

      <Box
        p={10}
        
        width="60%"
        border="1px solid"
        display="grid"
        height='100%'
        position='relative'
      overflowY='auto'
      overflowX='hidden'
      >
        <AnimatePresence mode="wait">

<motion.div key={activeStep} initial={{opacity: 0, y:10}} animate={{opacity: 1, y:0,}} exit={{opacity: 0,y:10}}transition={{duration: 0.2}}>
        {renderComponentForStep(activeStep)}
  </motion.div> 
        </AnimatePresence>

        <Box
          w="100%"
          display="flex"
          flexDir="row"
          justifyContent="space-between"
          position='relative'
          bottom='0'
          alignItems='flex-end'
          flexWrap='wrap'
          height='fit-content'
          alignSelf='end'
          pt={5}
          
        >
          <Button
            colorScheme="blue"
            onClick={handlePrev}
            isDisabled={activeStep === 0}
          >
            Previous
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleNext}
            isDisabled={activeStep === steps.length - 1}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
