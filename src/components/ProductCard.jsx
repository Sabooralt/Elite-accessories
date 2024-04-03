import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  IconButton,
  Image,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { GlobalButton } from "./GlobalButton";
import { PiShoppingCartLight } from "react-icons/pi";
import { FaHeart } from "react-icons/fa";
import { useAddToCart } from "../hooks/useAddToCart";

export default function ProductCard({ product }) {
  const toast = useToast();
  const {addtocart} = useAddToCart();

  const handleAddToCart = ()=>{
    addtocart({
      productId: product._id,
      quantity: 1,
    })
  }
  return (
    <Card width="100%" height="100%" position={"relative"} bg={"transparent"}>
      <CardBody p={0} width={"100%"} height={"100%"}>
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
            icon={<FaHeart width={"fit-content"} />}
            aria-label="Like"
            bg="transparent"
            fontSize="2xl"
            color="#E31F1F"
          />
        </Box>

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
          </VStack>
        </CardFooter>
      </CardBody>
    </Card>
  );
}
