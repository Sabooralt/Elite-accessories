import { Flex, IconButton, ListItem, Text, useToast } from "@chakra-ui/react";
import React from "react";
import { FiTrash } from "react-icons/fi";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import axios from "axios";

export default function CategoryList({ category }) {
  const { dispatch } = useCategoryContext();
  const toast = useToast();

  const handleDelete = async () => {
    const response = await axios.delete(
      "http://localhost:4000/api/category/" + category._id
    );

    const json = await response.data;

    if (response.status === 200) {
      toast({
        title: `${category.name} Deleted!`,
        description: `${category.name} successfully Deleted!`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch({ type: "DELETE_CATEGORY", payload: json });
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

  return (
    <ListItem className="d-flex flex-row justify-content-between">
      <Text>{category.name}</Text>

      <Flex style={{ gap: 10 }}>
        <IconButton
          onClick={handleDelete}
          colorScheme="red"
          aria-label="Delete"
          icon={<FiTrash />}
        />
      </Flex>
    </ListItem>
  );
}
