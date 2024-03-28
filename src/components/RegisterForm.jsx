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

export default function RegisterForm() {
  return (
    <VStack w={"100%"} mt={5} position={"relative"}>
      <form style={{ width: "100%" }}>
        <VStack>
          <FormControl>
            <InputGroup>
              <InputLeftElement mt={1}>
                <FaRegUser size={18} color="#323030" />
              </InputLeftElement>
              <Input
                size={"md"}
                bg={"#D9D9D9"}
                borderRadius={"customA"}
                placeholder={"Full Name"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
          </FormControl>

          <FormControl mt={2}>
            <InputGroup>
              <InputLeftElement mt={1}>
                <FaRegUser size={18} color="#323030" />
              </InputLeftElement>
              <Input
                size={"md"}
                bg={"#D9D9D9"}
                borderRadius={"customA"}
                placeholder={"Email Address"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
          </FormControl>

          <FormControl mt={2}>
            <InputGroup>
              <InputLeftElement mt={1}>
                <HiOutlineLockClosed size={18} color="#323030" />
              </InputLeftElement>
              <Input
                bg={"greyLight"}
                size={"md"}
                placeholder="Password"
                borderRadius={"customA"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
          </FormControl>

          <FormControl mt={2}>
            <InputGroup>
              <InputLeftElement mt={1}>
                <HiOutlineLockClosed size={18} color="#323030" />
              </InputLeftElement>
              <Input
                bg={"greyLight"}
                size={"md"}
                placeholder="Confirm Password"
                borderRadius={"customA"}
                boxShadow={"customShadow"}
                border={"1px solid #000"}
              ></Input>
            </InputGroup>
          </FormControl>


          <GlobalButton
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
            Create Account
          </GlobalButton>
        </VStack>
      </form>
    </VStack>
  );
}
