import { useLocation } from "react-router-dom";
import { useProductsContext } from "../hooks/useProductsContext";
import { Box, Heading } from "@chakra-ui/react";
import { useEffect } from "react";

export const SearchedProducts = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  const { products } = useProductsContext();

  const searchedProducts =
    products &&
    products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

  console.log(query);

  return (
    <Box>
      <Heading>Search Results for {query}</Heading>
      {searchedProducts.map((product) => (
        <li key={product._id}>{product.title}</li>
      ))}
    </Box>
  );
};
