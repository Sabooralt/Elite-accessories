import React, { useEffect } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import axios from "axios";
import {
  Badge,
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";
import { FaPencil } from "react-icons/fa6";
import ProductCard from "./ProductCard";

export default function AdminProducts() {
  const { products, dispatch } = useProductsContext();


 
  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();

      console.log(products);
      console.log(data);
      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: data });
      }
    };

    fetchAllProducts();
  }, [dispatch]);

  return (
    <div>
      <SimpleGrid columns={2} spacing={10}>
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product._id}/>
          ))}
      </SimpleGrid>
    </div>
  );
}
