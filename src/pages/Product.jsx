import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Spacer,
  Tag,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { StarRating } from "../components/ReviewsCard";
import FilledStarRating from "../components/FilledStarRating";
import { CheckIcon, CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { GlobalButton } from "../components/GlobalButton";
import { PiShoppingCartLight } from "react-icons/pi";

export default function Product({ product }) {
  return (
    <Center>
      <Flex
        sx={{
          position: "fixed",
          placeItems: "center",
          display: "flex",
          width: "90%",
          bottom: "0",
          maxHeight: "90vh",
          backgroundColor: "#000",
          background:
            "linear-gradient(rgb(0 0 0 / 90%), rgb(0 0 0 / 90%)), url(/cover.jpeg)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          bottom: 0,
          borderTopRadius: "60px",
          overflow: "hidden",
          border: "4px solid #000",
          justifyContent: "flex-start",
        }}
      >
        <Box maxW="40%">
          <Image
            h="100%"
            src="/ProductImages/3be20a3f-fad4-4f9b-84d9-b4150df3db30-1711760556548.jpg"
          />
        </Box>
        <VStack
          color="primaryLight"
          px="10"
          h="100%"
          width="100%"
          display="flex"
          flexDir="column"
          justifyContent="start"
          alignItems="baseline"
          fontWeight="500"
          spacing={7}
        >
          <VStack alignItems={"baseline"} spacing={0}>
            <Heading fontWeight="550" fontSize="2.6rem">
              Leather Cover
            </Heading>
            <HStack spacing={0}>
              <FilledStarRating rating={5} />
            </HStack>
          </VStack>

          <VStack mt={3} alignItems="baseline">
            <Box
              sx={{
                position: "absolute",
                right: "20px",
                top: "25px",
              }}
            >
              <IconButton
                variant="unstyled"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                minW="20px"
                borderRadius={"50%"}
                h={"20px"}
                bg={"primary"}
                icon={<SmallCloseIcon fontSize={"larger"} color="#000" />}
              />
            </Box>
            <Heading
              fontSize="x-large"
              fontWeight="600"
              textTransform="uppercase"
            >
              Description
            </Heading>
            <Text fontSize={"medium"}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Distinctio exercitationem saepe dolore non sequi ad modi itaque,
              enim illo tenetur?
            </Text>
          </VStack>

          <VStack alignItems="baseline">
            <Heading
              fontSize="x-large"
              fontWeight="600"
              textTransform="uppercase"
            >
              Colors
            </Heading>
            <VStack spacing={1}>
              <Box
                w={30}
                height={30}
                borderRadius="50%"
                bg={"primaryLight"}
                border="1px solid #000"
              ></Box>
            </VStack>
          </VStack>

          <VStack spacing={1} alignItems="baseline">
            <HStack justifyContent="space-between">
              <Heading
                fontSize="x-large"
                fontWeight="600"
                textTransform="uppercase"
              >
                Models
              </Heading>
            </HStack>

            <HStack>
              <Tag
                textTransform="capitalize"
                px={3}
                py={1}
                fontWeight={600}
                variant="solid"
                bg="#f2f2f2"
                color={"textC"}
              >
                Teasd al
              </Tag>
            </HStack>
          </VStack>

          <VStack alignItems="baseline">
            <Heading
              fontSize="x-large"
              fontWeight="600"
              textTransform="uppercase"
            >
              service
            </Heading>
            <HStack spacing={2}>
              <Box padding="0 7px" borderRadius="50%" bg={"#1fee4c"}>
                <Icon as={CheckIcon} color="#000" fontSize="8px" />
              </Box>
              <Text fontSize={"medium"} textTransform="capitalize">
                14 days free & easy return
              </Text>
            </HStack>

            <HStack spacing={2}>
              <Box padding="0 7px" borderRadius="50%" bg={"red"}>
                <Icon as={CloseIcon} color="#000" fontSize="8px" />
              </Box>
              <Text fontSize={"medium"} textTransform="capitalize">
                Warranty not available
              </Text>
            </HStack>
          </VStack>

          <HStack
            w="100%"
            alignItems={"center"}
            display="flex"
            justifyContent="center"
          >
            <GlobalButton
              fontSize="large"
              bg={"primary"}
              fontWeight={600}
              boxShadow="0"
              borderRadius="customA"
            >
              Place Order
            </GlobalButton>
            <GlobalButton
              fontSize="large"
              bg={"primary"}
              fontWeight={600}
              boxShadow="0"
              borderRadius="customA"
              rightIcon={<PiShoppingCartLight size={23} />}
            >
              Add To Cart
            </GlobalButton>
            <Tooltip label="Add to favourites">
              <Box>
                <svg
                  width="40"
                  height="35"
                  viewBox="0 0 40 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.26168 19.5222L19.0198 32.4465C19.4937 32.8917 19.7307 33.1143 20.0101 33.1691C20.1359 33.1938 20.2653 33.1938 20.3911 33.1691C20.6705 33.1143 20.9075 32.8917 21.3814 32.4465L35.1395 19.5222C39.0105 15.8858 39.4805 9.90182 36.2249 5.70563L35.6127 4.91661C31.718 -0.10324 23.9003 0.738628 21.1636 6.47259C20.7771 7.28254 19.6241 7.28255 19.2376 6.47259C16.5009 0.738628 8.6832 -0.103243 4.78849 4.9166L4.17632 5.70562C0.920649 9.90182 1.39072 15.8858 5.26168 19.5222Z"
                    fill="#E31F1F"
                    fill-opacity="0.95"
                    stroke="black"
                    stroke-width="2.77038"
                  />
                </svg>
              </Box>
            </Tooltip>
          </HStack>
        </VStack>
      </Flex>
    </Center>
  );
}
