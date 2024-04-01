import {
  FormControl,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineLockClosed } from "react-icons/hi2";
import { GlobalButton } from "./GlobalButton";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterForm() {
  const [fullName, setfullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleHidePassowrd = () => {
    setHidePassword(!hidePassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(fullName, email, password);
  };

  return (
    <VStack w={"100%"} mt={5} position={"relative"}>
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <InputGroup>
              <InputLeftElement >
                <FaRegUser size={18} color="#323030" />
              </InputLeftElement>
              <Input
                type="text"
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
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
              <InputLeftElement >
                <FaRegUser size={18} color="#323030" />
              </InputLeftElement>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
              <InputLeftElement >
                <HiOutlineLockClosed size={18} color="#323030" />
              </InputLeftElement>
              <InputRightElement>
              {hidePassword ?(
                
                <FiEye size={18} color="#323030" onClick={handleHidePassowrd} />
              ): <FiEyeOff size={18} color="#323030" onClick={handleHidePassowrd}/>}
              </InputRightElement>
              <Input
                type={`${hidePassword ? "password" : "text"}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
              <InputLeftElement >
                <HiOutlineLockClosed size={18} color="#323030" />
              </InputLeftElement>
              <Input
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
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
            type="submit"
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
        </VStack>
      </form>
    </VStack>
  );
}
