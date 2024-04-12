import {
  Box,
  Card,
  CardBody,
  CardFooter,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { GlobalButton } from "./GlobalButton";
import { PiShoppingCartLight } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { useAddToCart } from "../hooks/useAddToCart";
import ReviewModal from "./ReviewModal";
import { useAddReview } from "../hooks/useAddReview";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { addtocart } = useAddToCart();

  const handleAddToCart = () => {
    addtocart({
      productId: product._id,
      quantity: 1,
    });
  };

  return (
    <>
      <ReviewModal
        isOpen={isOpen}
        onClose={onClose}
        title="Submit a review"
        productId={product._id}
      ></ReviewModal>
      <Card width="100%" height="100%" position={"relative"} bg={"transparent"}>
        <CardBody p={0} width={"100%"} height={"100%"}>
    <Link to={`products/${product._id}`}>
          {}
          <Image
            src={product.images[0].filepath}
            objectFit={"contain"}
            width={"100%"}
            maxH={"320px"}
            boxShadow={"cardShadow"}
            border={"1px solid #000"}
            outline={"none"}
            alt={product.images[0].filename}
            borderRadius="15"
          />
          <Box
            position="absolute"
            top="0"
            right={0}
            width={"fit-content"}
            bg={"transparent"}
            _hover={{}}
          >
            {/* Icon button */}
            <IconButton
              variant="unstyled"
              icon={<HeartIcon/>}
              aria-label="Like"
              bg="transparent"
              fontSize="2xl"
              color="#E31F1F"
            />
          </Box>
          </Link>

          <CardFooter px={0} justifyContent={"center"} position={"relative"}>
            <VStack w={"100%"}>
              <Box
                py={1.5}
                px={2}
                display={"flex"}
                justifyContent={"center"}
                alignContent={"center"}
                flexDirection={"column"}
                boxShadow={"customShadow"}
                w="100%"
                height="100%"
                textTransform={"capitalize"}
                fontWeight={"regular"}
                flexWrap={"wrap"}
                borderRadius={12}
                bg={"primary"}
                textAlign={"center"}
                border={"1px solid #000"}
              >
                <Text
                  fontSize={{ lg: "large", md: "medium", sm: "small" }}
                  fontWeight={600}
                >
                  {product.title}
                </Text>
                <Heading
                  as={"h5"}
                  fontSize={{
                    lg: "x-large",
                    md: "x-large",
                    sm: "medium",
                    base: "small",
                  }}
                  textTransform={"uppercase"}
                >
                  PKR {product.prize}
                </Heading>
              </Box>
              <GlobalButton
                onClick={handleAddToCart}
                mt={2}
                bg={"secondary"}
                p={5}
                rightIcon={<PiShoppingCartLight size={23} />}
              >
                Add To Cart
              </GlobalButton>
              <GlobalButton
                onClick={onOpen}
                mt={2}
                bg={"secondary"}
                p={5}
                rightIcon={<PiShoppingCartLight size={23} />}
              >
                Add a Review
              </GlobalButton>
            </VStack>
          </CardFooter>
        </CardBody>
      </Card>
</>
  );
}
export const HeartIcon = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.37791 16.8057L13.779 24.6977C14.0684 24.9695 14.2131 25.1054 14.3837 25.1389C14.4605 25.154 14.5395 25.154 14.6164 25.1389C14.787 25.1054 14.9316 24.9695 15.221 24.6977L23.6221 16.8057C25.9858 14.5853 26.2729 10.9313 24.2849 8.36899L23.9111 7.8872C21.5328 4.82195 16.7591 5.33601 15.0881 8.83732C14.852 9.3319 14.148 9.3319 13.912 8.83732C12.2409 5.33601 7.46717 4.82195 5.08896 7.88721L4.71515 8.36899C2.72716 10.9313 3.0142 14.5853 5.37791 16.8057Z"
        fill="#E31F1F"
        fill-opacity="0.95"
        stroke="black"
        stroke-width="1.69167"
      />
    </svg>
  );
};
