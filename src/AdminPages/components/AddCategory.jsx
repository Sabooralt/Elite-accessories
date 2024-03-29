import { Button, Input, Text, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

export default function AddCategory() {
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);
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
    </div>
  );
}
