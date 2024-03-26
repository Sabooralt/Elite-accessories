import { Center, Container, Heading, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <Container minW={"70rem"}>
        <Center>
          <VStack>
            <Heading> Oops Page Not Found!</Heading>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              quas officiis quo quia, at deleniti vel tempore eos, molestiae ad
              asperiores, ullam laborum dolor laboriosam suscipit. Similique
              tempore expedita pariatur!
            </p>

            <p>
              Go to the{" "}
              <Link path="/">
                <b>Home Page</b>
              </Link>
              .
            </p>
          </VStack>
        </Center>
      </Container>
    </div>
  );
}
