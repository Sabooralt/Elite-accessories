import { Flex, Icon, IconButton, ListItem, Text, useToast,Tooltip, useDisclosure,Popover, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, PopoverFooter, ButtonGroup, Button, PopoverTrigger, Divider } from "@chakra-ui/react";
import React from "react";
import { FiTrash } from "react-icons/fi";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import axios from "axios";

export default function CategoryList({ category }) {
  const { dispatch } = useCategoryContext();
  const toast = useToast();
  const {isOpen, onClose, onToggle} = useDisclosure();

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
        <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement='right'
        closeOnBlur={true}
      >
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
          Note: Deleting the category will also delete all products associated with it. <Divider/>
            Are you sure you want to continue with your action?
          </PopoverBody>
          <PopoverFooter display='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
              <Button variant='outline' onClick={onClose}>Cancel</Button>
              <Button colorScheme='red' onClick={handleDelete}>Delete</Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
        <PopoverTrigger>
        

        <IconButton
          onClick={onToggle}
          colorScheme="red"
          aria-label="Delete"
          icon={<FiTrash />}
          />
          </PopoverTrigger>
      </Popover>

      


      </Flex>
    </ListItem>
  );
}
