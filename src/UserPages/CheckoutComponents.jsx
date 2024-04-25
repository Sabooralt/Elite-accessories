import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftAddon,
  Box,
  VStack,
  Icon,
  Card,
  CardBody,
  Text,
  Radio,
  Heading,
  CardHeader,
  Tag,
  TagLabel,
} from "@chakra-ui/react";
import { useAuthContextProvider } from "../hooks/useAuthContext";
import { useFormik } from "formik";
import { GlobalButton } from "../components/GlobalButton";
import { CiCreditCard1 } from "react-icons/ci";
import { GiTakeMyMoney } from "react-icons/gi";
import * as Yup from "yup";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useState } from "react";
import axios from "axios";

export const Shipping = ({ onSubmit, handleNext, handlePrev }) => {
  const { user } = useAuthContextProvider();

  const formik = useFormik({
    initialValues: {
      addressLine_1: "",
      addressLine_2: "",
      city: "",
      country: "Pakistan",
      email: user ? user.email : "",
      fullName: user ? user.fullName : "",
      phoneNumber: "",
      postal_code: "",
      state: "",
    },
    validationSchema: Yup.object({
      addressLine_1: Yup.string().trim().required("This field is required."),
      city: Yup.string().trim().required("City is required."),
      phoneNumber: Yup.string()
        .matches(/^(\+92)?(0)?3[0-9]{9}$/, "Invalid phone number")
        .required("Phone number is required"),
      state: Yup.string().required("State is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);

      handleNext();
    },
  });

  return (
    <VStack>
      <form
        style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        onSubmit={formik.handleSubmit}
      >
        <FormControl
          isInvalid={
            formik.touched.addressLine_1 && formik.errors.addressLine_1
              ? formik.errors.addressLine_1
              : ""
          }
        >
          <FormLabel>
            Address Line 1 <sup style={{ color: "orangered" }}>*</sup>
          </FormLabel>
          <Input type="text" {...formik.getFieldProps("addressLine_1")} />
          <FormErrorMessage>
            {formik.touched.addressLine_1 && formik.errors.addressLine_1
              ? formik.errors.addressLine_1
              : ""}
          </FormErrorMessage>
        </FormControl>
        <FormControl
          isInvalid={
            formik.touched.addressLine_2 && formik.errors.addressLine_2
              ? formik.errors.addressLine_2
              : ""
          }
        >
          <FormLabel>Address Line 2 (Optional) </FormLabel>
          <Input type="text" {...formik.getFieldProps("addressLine_2")} />
        </FormControl>
        <HStack>
          <FormControl
            isInvalid={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : ""
            }
          >
            <FormLabel>
              City <sup style={{ color: "orangered" }}>*</sup>
            </FormLabel>
            <Input type="text" {...formik.getFieldProps("city")} />
            <FormErrorMessage>
              {formik.touched.city && formik.errors.city
                ? formik.errors.city
                : ""}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>
              Country <sup style={{ color: "orangered" }}>*</sup>
            </FormLabel>
            <Input
              type="text"
              value="Pakistan"
              {...formik.getFieldProps("country")}
              readOnly
            />
          </FormControl>
        </HStack>
        <HStack>
          <FormControl>
            <FormLabel>
              Full Name <sup style={{ color: "orangered" }}>*</sup>
            </FormLabel>
            <Input type="text" {...formik.getFieldProps("fullName")} readOnly />
          </FormControl>

          <FormControl>
            <FormLabel>
              Email <sup style={{ color: "orangered" }}>*</sup>
            </FormLabel>
            <Input type="text" {...formik.getFieldProps("email")} readOnly />
          </FormControl>
        </HStack>
        <FormControl
          isInvalid={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ""
          }
        >
          <FormLabel>
            Phone Number <sup style={{ color: "orangered" }}>*</sup>
          </FormLabel>
          <InputGroup>
            <InputLeftAddon>+92</InputLeftAddon>
            <Input
              type="tel"
              placeholder="312345678"
              {...formik.getFieldProps("phoneNumber")}
            />
          </InputGroup>
          <FormErrorMessage>
            {formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ""}
          </FormErrorMessage>
        </FormControl>

        <HStack>
          <FormControl
            isInvalid={
              formik.touched.postal_code && formik.errors.postal_code
                ? formik.errors.postal_code
                : ""
            }
          >
            <FormLabel>Postal Code</FormLabel>
            <Input type="number" {...formik.getFieldProps("postal_code")} />
            <FormErrorMessage>
              {formik.touched.postal_code && formik.errors.postal_code
                ? formik.errors.postal_code
                : ""}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={
              formik.touched.state && formik.errors.state
                ? formik.errors.state
                : ""
            }
          >
            <FormLabel>
              State <sup style={{ color: "orangered" }}>*</sup>
            </FormLabel>
            <Input type="text" {...formik.getFieldProps("state")} />

            <FormErrorMessage>
              {formik.touched.state && formik.errors.state
                ? formik.errors.state
                : ""}
            </FormErrorMessage>
          </FormControl>
        </HStack>

        <FormControl w="30%">
          <Button colorScheme="purple" size="sm">
            Save Shipping Address
          </Button>
        </FormControl>
        <Box>
          <Button
            type="submit"
            isDisabled={!formik.isValid || !formik.dirty}
            colorScheme="purple"
          >
            Continue To Payment
          </Button>
        </Box>
      </form>
    </VStack>
  );
};

export const Billing = ({onSubmit,handleNext}) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentMethods,setPaymentMethods] = useState(null);

  useEffect(()=>{
    const fetchPaymentMethods = async ()=>{
      try{
        const response = await axios.get("http://localhost:4000/api/payment-method");

        if(response.status === 201){
          setPaymentMethods(response.data);
        }
        if(response.status === 400){
          console.log(response.statusText);
        }

      }catch(err){

        console.log(err)

      }
    

      
    }
    fetchPaymentMethods();
  },[])



  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(selectedMethod);
    handleNext();


  };
  return (
    <>
      <VStack
        sx={{
          alignItems: "center",
          width: "100%",
          height: "40px",
        }}
      >
        <Box alignSelf={"baseline"}>
          <Heading>Choose a payment method</Heading>
          <Text m={0} color={"gray.600"}>
            You will not be charged until you review this order on the page.
          </Text>
        </Box>

        <form style={{width: '100%'}} onSubmit={handleSubmit}>
          {paymentMethods ? paymentMethods
            .sort((a, b) => {
              return b.disabled - a.disabled;
            })
            .map((method) => (
              <Card
                key={method._id}
                direction="row"
                {...(method.disabled && {
                  sx: { opacity: 0.7, pointerEvents: "none" },
                })}
                alignItems="center"
                p="2"
                w={"100%"}
              >

               <GiTakeMyMoney/>
                <CardBody
                  display="flex"
                  flexDir={"row"}
                  gap="5"
                  alignItems={"center"}
                  justifyContent="space-between"
                >
                  <Text m={0}>{method.method}</Text>

                  <Radio
                  onChange={(e)=>setSelectedMethod(e.target.value)}
                  value={method._id}
                    checked={selectedMethod === method._id}
                  />
                </CardBody>
              </Card>
            )): <Heading>Please wait...</Heading>}

        <Text>{selectedMethod}</Text>


        <Button
        type="submit"
        sx={{ position: "absolute", bottom: 10 }}
          colorScheme="blue"
          isDisabled={!selectedMethod}
        zIndex={20}
        >
          Order Summary
        </Button>
          </form>
      </VStack>
    </>
  );
};

export const OverView = ({paymentMethod,shipping}) => {
  
const [paymentMethodData,setPaymentMethodData] = useState([]);
  useEffect(()=>{
    const fetchSinglePaymentMethod = async ()=>{
      const response = await axios.get("http://localhost:4000/api/payment-method/"+paymentMethod);

      if(response.status === 201){
setPaymentMethodData(response.data);
      }
      if(response.status === 400){
        console.log('nope')
      }
    }
    fetchSinglePaymentMethod();
  },[])
  return (
    <VStack>
      <Box alignSelf={"baseline"}>
        <Heading size={"lg"}>Please confirm and submit your order</Heading>
        <Text m={0} color={"gray.600"}>
          By clicking submit order, you agree to Elite Accessories Terms of Use
          and Privacy Policy
        </Text>
      </Box>
      <VStack w="100%">
        <Card w="100%" gap="2">
          <CardHeader
            sx={{
              display: "flex",
              flexDir: "row",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "0",
            }}
          >
            <Heading size={"sm"}>Payment</Heading>

            <Tag colorScheme="teal">
              <TagLabel>Edit</TagLabel>
            </Tag>
          </CardHeader>
          <CardBody
            flexDirection="row"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>{paymentMethodData && paymentMethodData.method}</Text>
            <Radio defaultChecked isDisabled />
          </CardBody>
        </Card>

        <Card w="100%" gap="2">
          <CardHeader
            sx={{
              display: "flex",
              flexDir: "row",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "0",
            }}
          >
            <Heading size={"sm"}>Shipping address</Heading>

            <Tag colorScheme="teal">
              <TagLabel>Edit</TagLabel>
            </Tag>
          </CardHeader>
          <CardBody
            flexDirection="column"
            display="flex"
            justifyContent="start"
            alignItems="center"
          >
            <HStack
              w="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text color="gray.600">Name</Text>
              <Text>{shipping && shipping.fullName}</Text>
            </HStack>
            <HStack
              w="100%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Text color="gray.600">Name</Text>
              <Text>{shipping && shipping.addressLine_1}</Text>
            </HStack>
          </CardBody>
        </Card>
      </VStack>
    </VStack>
  );
};
