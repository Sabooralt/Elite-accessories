import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { GlobalButton } from "./GlobalButton";
import { FiEye, FiEyeOff } from "react-icons/fi";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSignup } from "../hooks/useSignup";

export default function RegisterForm() {
  const [hidePassword, setHidePassword] = useState(true);
  const { isLoading, signup, responseG, error } = useSignup();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .min(5, "Name is too short")
        .required("Name is required."),
      email: Yup.string()
        .trim()
        .email("Invalid email format")
        .required("Email is required."),
      password: Yup.string()
        .trim()
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
        )
        .required("Password is required."),
      confirmPassword: Yup.string()
        .trim()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password."),
    }),
    onSubmit: async (values) => {
      await signup(values);
    },
  });

  useEffect(() => {
    if (responseG) {
        toast({
            title: 'Error',
            description: responseG.message,
            status: responseG.type,
            duration: 5000,
            isClosable: true,
        });
        
        if (responseG.type === "success") {
            formik.resetForm();
        }
    }
}, [responseG, toast]);

  const handleHidePassowrd = () => {
    setHidePassword(!hidePassword);
  };

  return (
    <VStack w={"100%"} mt={5} position={"relative"}>
      <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
        <VStack>
          <FormControl
            isInvalid={
              formik.touched.fullName && formik.errors.fullName
                ? formik.errors.fullName
                : ""
            }
          >
            <InputGroup>
              <InputLeftElement>
                <FaRegUser size={18} color="#323030" />
              </InputLeftElement>
              <Input
                type="text"
                {...formik.getFieldProps("fullName")}
                size={"md"}
                bg={"#D9D9D9"}
                borderRadius={"customA"}
                placeholder={"Full Name"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
            <FormErrorMessage>
              {formik.touched.fullName && formik.errors.fullName
                ? formik.errors.fullName
                : ""}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            mt={2}
            isInvalid={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          >
            <InputGroup>
              <InputLeftElement>
                <FaRegUser size={18} color="#323030" />
              </InputLeftElement>
              <Input
                type="email"
                {...formik.getFieldProps("email")}
                size={"md"}
                bg={"#D9D9D9"}
                borderRadius={"customA"}
                placeholder={"Email Address"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
            <FormErrorMessage>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            mt={2}
            isInvalid={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          >
            <InputGroup>
              <InputLeftElement>
                <HiOutlineLockClosed size={18} color="#323030" />
              </InputLeftElement>
              <InputRightElement>
                {hidePassword ? (
                  <FiEye
                    size={18}
                    color="#323030"
                    onClick={handleHidePassowrd}
                  />
                ) : (
                  <FiEyeOff
                    size={18}
                    color="#323030"
                    onClick={handleHidePassowrd}
                  />
                )}
              </InputRightElement>
              <Input
                {...formik.getFieldProps("password")}
                type={`${hidePassword ? "password" : "text"}`}
                bg={"greyLight"}
                size={"md"}
                placeholder="Password"
                borderRadius={"customA"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
            <FormErrorMessage>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </FormErrorMessage>
          </FormControl>

          <FormControl
            mt={2}
            isInvalid={
              formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""
            }
          >
            <InputGroup>
              <InputLeftElement>
                <HiOutlineLockClosed size={18} color="#323030" />
              </InputLeftElement>
              <Input
                {...formik.getFieldProps("confirmPassword")}
                bg={"greyLight"}
                size={"md"}
                placeholder="Confirm Password"
                borderRadius={"customA"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
            <FormErrorMessage>
              {formik.touched.confirmPassword && formik.errors.confirmPassword
                ? formik.errors.confirmPassword
                : ""}
            </FormErrorMessage>
          </FormControl>

          <GlobalButton
            type="submit"
            isLoading={isLoading}
            mt={5}
            w={"100%"}
            bg={"secondary"}
            fontSize={{
              lg: "x-large",
              md: "large",
              sm: "medium",
              base: "medium",
            }}
            py="6"
            borderRadius={"customA"}
          >
            Create Account
          </GlobalButton>

          {error && <Text>{error}</Text>}
        </VStack>
      </form>
    </VStack>
  );
}
