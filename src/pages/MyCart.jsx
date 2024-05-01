import {
  Box,
  Flex,
  Image,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Tfoot,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Circle,
  SkeletonCircle,
  Heading,
  IconButton,
  Stack,
  Divider,
  useToast,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCartContext } from "../hooks/useCartContext";
import { DeleteIcon } from "@chakra-ui/icons";
import { GlobalButton } from "../components/GlobalButton";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useClearCart } from "../hooks/useClearCart";
import { useUpdateCartQuantity } from "../hooks/useUpdateCartQuantity";

export default function MyCart() {
  const { items, dispatch,total } = useCartContext();
  const { clearCart, isLoading, responseG } = useClearCart();
  const [newQuantity, setNewQuantity] = useState();
  const navigate = useNavigate();
  const { updateQuantity } = useUpdateCartQuantity();
  const toast = useToast();

  //Handle Quantity

  const handleQuantity = (id, operation) => {
    
    updateQuantity(id, operation);
  };

  const handleClearCart = () => {
    clearCart();
  };

  useEffect(() => {
    if (responseG) {
      toast({
        title: responseG.type,
        description: responseG.message,
        status: responseG.type,
      });
    }
  },[responseG]);

  const handleItemDelete = async (item) => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/cart/remove/" + item._id,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const json = await response.json();
        toast({
          title: "Success",
          description: "Item Deleted from cart",
          duration: 5000,
          status: "success",
          isClosable: true,
        });
        dispatch({ type: "REMOVE_FROM_CART", payload: json });
      } else {
        toast({
          title: "Error",
          description: "Unknown error occurred. Please try again!",
          duration: 5000,
          status: "error",
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error occurred while deleting item:", error);
      toast({
        title: "Error",
        description:
          "An error occurred while deleting the item. Please try again later.",
        duration: 5000,
        status: "error",
        isClosable: true,
      });
    }
  };

  const calculateItemSubtotal = (item) => {
    return item.product.price * item.quantity;
  };

  const calculateTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += calculateItemSubtotal(item);
    });
    return total;
  };
  return (
    <>
      {items.length > 0 ? (
        <TableContainer
          padding="5em"
          position="relative"
          display={"flex"}
          flexDirection={"column"}
        >
          <Table variant="striped" colorScheme="teal">
            <Thead>
              <Tr>
                <Th>Items ({items.length})</Th>
                <Th>Price</Th>
                <Th isNumeric>Quantity</Th>
                <Th isNumeric>Subtotal</Th>
                <Th isNumeric>Remove</Th>
              </Tr>
            </Thead>
            <Tbody>
              {items &&
                items.map((item) => (
                  <Tr key={item._id}>
                    <Td display="flex">
                      <Image
                        objectFit="contain"
                        w="100px"
                        h="100px"
                        src="/products/demoproduct.jpeg"
                      />
                      <Box>
                        <Text>{item && item.product.title}</Text>

                        <Text
                          display="flex"
                          alignItems="center"
                          justifyContent="start"
                          gap="10px"
                        >
                          Color:{" "}
                          <SkeletonCircle
                            color={item.color}
                            bg={item.color}
                            size="6"
                            isLoaded
                          />
                        </Text>
                      </Box>
                    </Td>
                    <Td>{item && item.product.price}</Td>
                    <Td isNumeric>
                      <Stack alignItems="center">
                        <Box>{item && item.quantity}</Box>
                        <HStack w="fit-content">
                          <Box
                            cursor="pointer"
                            p={1}
                            w="fit-content"
                            bg="primary"
                            onClick={() =>
                              handleQuantity(item._id, "decrement")
                            }
                          >
                            <Text fontSize="xx-large" m={0}>
                              -
                            </Text>
                          </Box>
                          <Box
                            cursor="pointer"
                            p={1}
                            w="fit-content"
                            bg="primary"
                            onClick={() =>
                              handleQuantity(item._id, "increment")
                            }
                          >
                            <Text fontSize="x-large" m={0}>
                              +
                            </Text>
                          </Box>
                        </HStack>
                      </Stack>
                    </Td>
                    <Td isNumeric>Rs.{item.subtotal}</Td>

                    <Td isNumeric>
                      <IconButton
                        onClick={() => handleItemDelete(item)}
                        bg="teal"
                        icon={<DeleteIcon />}
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>
                  <Link to={"/"}>
                    <GlobalButton bg="#f2fed1" borderRadius="0">
                      Continue Shopping
                    </GlobalButton>
                  </Link>
                </Th>
                <Th></Th>
                <Th></Th>
                <Th></Th>

                <Th isNumeric>
                  <GlobalButton
                    onClick={handleClearCart}
                    bg="secondary"
                    borderRadius="0"
                  >
                    Clear Cart
                  </GlobalButton>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
          <Box
            p={4}
            bg="#CBD5E0"
            width="250px"
            display={"flex"}
            position={"relative"}
            alignSelf={"flex-end"}
          >
            <Stack className="w-100">
              <Box className="d-flex flex-direction-row justify-content-between align-items-center w-100">
                <Text color="#2D3748">Subtotal: </Text>
                <Text fontWeight="600">Rs.{calculateTotal(items)}</Text>
              </Box>
              <Box className="d-flex flex-direction-row justify-content-between align-items-center w-100">
                <Text color="#2D3748">Shipping Fee </Text>
                <Text fontWeight="600">Rs.100</Text>
              </Box>
              <Divider borderColor="#000" />
              <Box className="d-flex flex-direction-row justify-content-between align-items-center w-100">
                <Text color="#2D3748">Order Total </Text>
                <Text fontWeight="600">Rs.{total}</Text>
              </Box>
            </Stack>

          </Box>
          <GlobalButton mt={5} onClick={() => navigate(`/user/Checkout?orderType=cart`)}>
      Checkout
    </GlobalButton>
        </TableContainer>
      ) : (
        <div className="d-flex justify-content-center align-items-center container h-100">
          <Heading>Your Cart Is Empty</Heading>
        </div>
      )}
    </>
  );
}
