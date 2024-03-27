import {
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { GlobalButton } from "./GlobalButton";

export default function SignInForm() {
  return (
    <VStack w={"100%"} mt={10} position={"relative"}>
      <form style={{ width: "100%" }}>
        <VStack >
          <FormControl>
            <InputGroup>
              <InputLeftElement mt={1}>
                <FaRegUser size={22} color="#323030" />
              </InputLeftElement>
              <Input
                size={"lg"}
                bg={"#D9D9D9"}
                textAlign={"center"}
                borderRadius={'customA'}
                placeholder={"Email or Phone Number"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
          </FormControl>

          <FormControl mt={5}>
            <InputGroup>
              <InputLeftElement mt={1}>
                <HiOutlineLockClosed size={22} color="#323030" />
              </InputLeftElement>
              <Input
                bg={"greyLight"}
                size={"lg"}
                textAlign={"center"}
                placeholder="Password"
                borderRadius={'customA'}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
          </FormControl>

          <Heading mt={2} fontSize={"x-large"}>Forgot password?</Heading>

          <GlobalButton
            mt={1}
            w={"100%"}
            bg={"secondary"}
            fontSize={"xx-large"}
           
            py="6"
            borderRadius={'customA'}
          >
            Access Your Account
          </GlobalButton>
        </VStack>
      </form>
    </VStack>
  );
}
