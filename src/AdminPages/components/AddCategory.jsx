import { Box, Button, Heading, Input, OrderedList, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import CategoryList from "./CategoryList";

export default function AddCategory() {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
  const {categories,dispatch} = useCategoryContext();
  const toast = useToast();


  const Upload = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/api/category", {
        name: category,
      });

      if (response.status === 201) {
        toast({
          title: `${category} Created!`,
          description: `${category} was successfully created!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        setCategory("");
        dispatch({type: 'CREATE_CATEGORY',payload: response.data})

      } else {
        setLoading(false);
        toast({
          title: "Oops!",
          description:
            "An error occurred while creating the category. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <VStack spacing={5}>
        <div className="text-center w-100">
          <Text fontSize={"x-large"} fontWeight={"bold"}>
            Add Category:
          </Text>
          <Input
            bg={"grey"}
            placeholder="Add Category"
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
            type="text"
          />
        </div>
        <Button isDisabled={!category} w={"100%"} onClick={Upload} colorScheme="purple">
          Submit
        </Button>
      </VStack>
<Box className="mt-5" width='100%' p={7} border='2px solid #000'>
<Heading>
  Categories:
</Heading>
      <OrderedList spacing={5} m={0} mt={5} padding={0}>
        {categories && categories.map((category)=>(
          <CategoryList key={category._id} category={category}/>
          ))}

      </OrderedList>
          </Box>
    </div>
  );
}
