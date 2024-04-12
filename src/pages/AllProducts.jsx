import React from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import { VStack, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function AllProducts() {
  const { products } = useProductsContext();
  return (
    <Box>
      {products.map((product) => (
        <Link key={product._id} to={product._id}>
        <VStack key={product._id}>
          <Text>{product.title}</Text>
         
        </VStack>
        </Link>
      ))}
    </Box>
  );
}
