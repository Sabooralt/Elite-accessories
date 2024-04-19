import {
  FormControl,
  FormErrorMessage,
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
import * as Yup from "yup";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { GlobalButton } from "./GlobalButton";
import { useFormik } from "formik";
import { useLogin } from "../hooks/useLogin";
import { FiEye, FiEyeOff } from "react-icons/fi";
import {  useNavigate } from "react-router-dom";

export default function SignInForm() {
  const [hidePassword, setHidePassword] = useState(true);
  const { isLoading, login, error, responseG} = useLogin();
  const toast = useToast();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required("Email is required."),
      password: Yup.string().trim().required("Password is required."),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await login(values);
    },
  });

  const handleHidePassowrd = () => {
    setHidePassword(!hidePassword);
  };

  useEffect(()=>{
    if(responseG){
      toast({
        title: 'Error',
        description: responseG.message,
        status: responseG.type,
        duration: 5000,
        isClosable: true,
      })
      if(responseG.type === "success"){
formik.resetForm();

setTimeout(()=>{
navigate('/')
},3000)
      }
    }
  },[responseG])

  return (
    <VStack w={"100%"} mt={5} position={"relative"}>
      <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
        <VStack>
          <FormControl
            isInvalid={
              formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""
            }
          >
            <InputGroup>
              <InputLeftElement mt={1}>
                <FaRegUser size={18} color="#323030" />
              </InputLeftElement>
              <Input
              className="customPlaceholder"
                {...formik.getFieldProps("email")}
                type="email"
                size={"md"}
                bg={"#D9D9D9"}
                borderRadius={"customA"}
                placeholder={"Email or Phone Number"}
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
            mt={5}
            isInvalid={
              formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""
            }
          >
            <InputGroup>
              <InputLeftElement mt={1}>
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
              className="customPlaceholder"
                type={`${hidePassword ? "password" : "text"}`}
                {...formik.getFieldProps("password")}
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

          <Heading
            mt={2}
            fontSize={{
              lg: "large",
              md: "large",
              sm: "large",
              base: "medium",
            }}
          >
            Forgot password?
          </Heading>

          <GlobalButton
          type="submit"
            isLoading={isLoading}
            isLoadingText={"Please Wait..."}
            mt={1}
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
            Access Your Account
          </GlobalButton>

          {error && <Text>{error}</Text>}
        </VStack>
      </form>
    </VStack>
  );
}
