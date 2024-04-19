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

export const Shipping = () => {
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
      localStorage.setItem("Shipping Address", values);
      console.log(values);
    },
  });

  return (
    <VStack>
      <form
        style={{ display: "flex", gap: "10px", flexDirection: "column" }}
        onSubmit={formik.handleSubmit}
      >
        <FormControl
          isRequired
          isInvalid={
            formik.touched.addressLine_1 && formik.errors.addressLine_1
              ? formik.errors.addressLine_1
              : ""
          }
        >
          <FormLabel>Address Line 1</FormLabel>
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
            isRequired
            isInvalid={
              formik.touched.city && formik.errors.city
                ? formik.errors.city
                : ""
            }
          >
            <FormLabel>City</FormLabel>
            <Input type="text" {...formik.getFieldProps("city")} />
            <FormErrorMessage>
              {formik.touched.city && formik.errors.city
                ? formik.errors.city
                : ""}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Country</FormLabel>
            <Input
              type="text"
              value="Pakistan"
              {...formik.getFieldProps("country")}
              readOnly
            />
          </FormControl>
        </HStack>
        <HStack>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input type="text" {...formik.getFieldProps("fullName")} readOnly />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input type="text" {...formik.getFieldProps("email")} readOnly />
          </FormControl>
        </HStack>
        <FormControl
          isRequired
          isInvalid={
            formik.touched.phoneNumber && formik.errors.phoneNumber
              ? formik.errors.phoneNumber
              : ""
          }
        >
          <FormLabel>Phone Number</FormLabel>
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
            isRequired
          >
            <FormLabel>State</FormLabel>
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
      </form>
    </VStack>
  );
};

export const Billing = () => {
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
        <Card
          direction="row"
          sx={{ opacity: 0.7, pointerEvents: "none" }}
          alignItems="center"
          px="2"
          w={"100%"}
        >
          <CiCreditCard1 />
          <CardBody
            display="flex"
            flexDir={"row"}
            gap="5"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Text>Credit/Debit Card</Text>

            <Radio />
          </CardBody>
        </Card>
        <Card direction="row" alignItems="center" px="2" w={"100%"}>
          <GiTakeMyMoney />
          <CardBody
            display="flex"
            flexDir={"row"}
            gap="5"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Text>Cash on delivery</Text>

            <Radio defaultChecked />
          </CardBody>
        </Card>
      </VStack>
    </>
  );
};

export const OverView = () => {
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
            <Text>Cash on delivery</Text>
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
            <HStack w='100%' display='flex' justifyContent='space-between' alignItems='center'>

            <Text color='gray.600'>Name</Text>
            <Text>Saboor Ahmed</Text>
            </HStack>
          </CardBody>
        </Card>

        
      </VStack>
    </VStack>
  );
};
