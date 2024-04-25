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
import { useCheckoutData } from "../hooks/useCheckoutData";

const steps = [
  { title: "Shipping", description: "Shipping Address" },
  { title: "Payment", description: "Payment Method" },
  { title: "Summary", description: "Order Summary" },
];

export const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod,setPaymentMethod] = useState(null);

  const handleShippigAddressData = (addressData) =>{
    setShippingAddress(addressData);
  }

  const handlePaymentMethod = (paymentData) =>{
    setPaymentMethod(paymentData)
  }

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrev = () => {
    if (activeStep === 0) {
    } else {
      setActiveStep(activeStep - 1);
    }
    console.log(activeStep);
  };



  const renderComponentForStep = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return <Shipping onSubmit={handleShippigAddressData} activeStep={activeStep} handleNext={handleNext} handlePrev={handlePrev} />;
      case 1:
        return <Billing onSubmit={handlePaymentMethod} handleNext={handleNext} handlePrev={handlePrev} />;
      case 2:
        return <OverView paymentMethod={paymentMethod} shipping={shippingAddress} />;
      default:
        return null;
    }
  };

  return (
    <Box
      display="flex"
      placeItems="center"
      width="100%"
      flexDir="row"
      justifyContent="space-around"
      alignItems="start"
      border="1px solid #000"
      px={10}
      py={5}
      height="80vh"
    >
      <Stepper
        height="100%"
        size="lg"
        orientation="vertical"
        index={activeStep}
      >
        {steps.map((step, index) => (
          <Step key={index}>
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
        height="100%"
        position="relative"
        overflowY="auto"
        overflowX="hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {renderComponentForStep(activeStep)}
          </motion.div>
        </AnimatePresence>

       <Box
          w="100%"
          display="flex"
          flexDir="row"
          justifyContent="space-between"
          position="relative"
          bottom="0"
          alignItems="flex-end"
          flexWrap="wrap"
          height="fit-content"
          alignSelf="end"
          pt={5}
        >
          <Button
            colorScheme="blue"
            onClick={handlePrev}
            isDisabled={activeStep === 0}
          >
            Back
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleNext}
           
          >
            {activeStep === 0
              ? "Continue to payment"
              : activeStep === 1
              ? "Order summary"
              : "Place Order"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
