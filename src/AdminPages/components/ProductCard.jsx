import React, { useEffect, useState } from "react";
import {
  Badge,
  Box,
  Center,
  Flex,
  IconButton,
  Image,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FaPencil } from "react-icons/fa6";
import { FiShoppingCart, FiTrash } from "react-icons/fi";
import { useProductsContext } from "../../hooks/useProductsContext";
import axios from "axios";
import UpdateProduct from "./UpdateProduct";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../hooks/useAddToCart";

export default function ProductCard({ product }) {
  const { dispatch } = useProductsContext();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {addtocart,isLoading,error,responseG} = useAddToCart();

  const handleDelete = async () => {
    const response = await axios.delete(
      "http://localhost:4000/api/products/" + product._id
    );

    const json = await response.data;

    if (response.status === 200) {
      dispatch({ type: "DELETE_PRODUCT", payload: json });
      toast({
        title: `${product.title} Deleted!`,
        description: `${product.title} successfully Deleted!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Oops!",
        description:
          "An error occurred while deleting the product. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  const differenceInDays = (createdAt) => {
    const createdDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - createdDate.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24));
  };

  const handleAddToCart = ()=>{
    addtocart({
      productId: product._id,
      quantity: 1,
    })

  }
  useEffect(()=>{
    if(responseG){
      toast({
        title: `${product.title} added to cart!`,
        description: responseG.message,
        status: responseG.type,
        duration: 5000,
        isClosable: true,
      })

      if(responseG.type === "error"){
        toast({
          title: `An error occured`,
          description: responseG.message,
          status: responseG.status,
          duration: 9000,
          isClosable: true,
        })
      }
    }
  })
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      key={product._id}
      borderRadius="lg"
      overflow="hidden"
    >
      <Center>
        {product.images.length > 0 && (
          <Image
            width={"100%"}
            maxH={"250px"}
            objectFit={"contain"}
            src={product.images[0].filepath}
            alt={product.images[0].filename}
          />
        )}
      </Center>

      <Box p="6" bg={"textC"}>
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            {differenceInDays(product.createdAt) <= 2 ? "New" : "Regular"}
          </Badge>
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
            ml="2"
          >
            &bull; {product.category.name}
          </Box>
        </Box>

        <Box
          mt="1"
          color="#f2f2f2"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {product.title}
        </Box>

        <Box
          color="#f2f2f2"
          className="d-flex justify-content-between align-items-center"
        >
          <Box>
            Rs.{product.price}
            <Box as="span" color="whitesmoke" fontSize="sm">
              / pp
            </Box>
          </Box>

          <Flex style={{ gap: 10 }}>
            <IconButton
              onClick={handleDelete}
              colorScheme="red"
              aria-label="Delete"
              icon={<FiTrash />}
            />
            <Link to={`/admin/updateProduct/${product._id}`}>
              <IconButton
                colorScheme="blue"
                aria-label="Update"
                icon={<FaPencil onClick={onOpen} />}
              />
            </Link>

            <IconButton onClick={handleAddToCart} colorScheme="purple" aria-label="Add To Cart" icon={<FiShoppingCart/>} />
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}
