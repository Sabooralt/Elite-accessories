import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Button,
  FormControl,
  Input,
  Textarea,
  Text,
  VStack,
  useToast,
  Box,
  Stack,
  Image,
} from "@chakra-ui/react";

import React, { useEffect, useRef, useState } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import Draggable from "react-draggable";

export default function InsertProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([]);
  const [phoneModels, setPhoneModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [images, setImages] = useState([]);
  const { state, dispatch } = useProductsContext();
  const [showToast, setShowToast] = useState(false);
  const toast = useToast();

  

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  /* const handleColorChange = (event) => {
    setColors([...colors, event.target.value]); // Add new color to the array
  }; */

  const handleSubmitButton = () => {
    if (title === '' || price === null || category === '' || description === '') {
      return false; // Disable button if any required field is empty or null
    }
  
    if (!colors || colors.length === 0 || !phoneModels || phoneModels.length === 0) {
      return false;
    }
  
    return true;
  }

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const product = {
      title,
      price,
      description,
      category,
      colors,
      phoneModels,
    };

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        body: JSON.stringify(product),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if (response.ok) {
        setTitle("");
        setPrice(0);
        setCategory('')
        setDescription("");
        setColors([]);
        setPhoneModels([]);
        dispatch({ type: "CREATE_PRODUCT", payload: json });

        toast({
          title: `${title} Created!`,
          description: `${title} was successfully created!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
      if (!response.ok) {
        setError(json.error);
        toast({
          title: "Oops!",
          description:
            "An error occurred while creating the product. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ gap: 20 }}
    >
      <VStack width={"100%"} bg={"textC"} py={5} borderRadius={"customA"}>
        <h1 className="text-white">Insert Product</h1>

        <form
          className="d-flex flex-column"
          onSubmit={handleSubmit}
          style={{ width: "70%" }}
        >
          <FormControl mt="5">
            <Input
              bg={"white"}
              color="textC"
              placeholder="Product Title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </FormControl>

          <FormControl mt="5">
            <Input
              bg={"white"}
              color="textC"
              placeholder="Product Price (only numbers)"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            />
          </FormControl>
          <FormControl mt="5">
            <Input
              bg={"white"}
              color="textC"
              placeholder="Category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </FormControl>
          <FormControl mt="5">
            <Input
              bg={"white"}
              color="textC"
              placeholder="Colors"
              type="text"
              value={colors}
              onChange={(e) => setColors(e.target.value)}
            />
          </FormControl>
          <FormControl mt="5">
            <Textarea
              bg={"white"}
              color={"black"}
              placeholder="Product Description"
              size="sm"
              type="text"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </FormControl>
          <FormControl mt="5">
            <Input
              bg={"white"}
              color={"black"}
              placeholder="Phone Models"
              type="text"
              onChange={(e) => setPhoneModels(e.target.value)}
              value={phoneModels}
            />
          </FormControl>
          <FormControl mt="5">
            <Text color={'white'}>
              Images:
            </Text>
            <Input
              bg={"white"}
              color={"black"}
              type="file"
              onChange={handleImageChange}
              multiple
              accept="image/*"
            />
          </FormControl>
      

          <Stack direction={'row'} mt='5' style={{gap: 20, overflow: 'scroll'}}>
        {images && images.map((image, index) => (
          <Image key={index} boxSize='250px' objectFit='cover' src={URL.createObjectURL(image)} alt={`Image ${index}`} />
        ))}
      </Stack>


          {/*  {colors &&
            colors.map((color, index) => (
              <div key={index} style={{ backgroundColor: color }}>
                {`Color ${index + 1}: ${color}`}
              </div>
            ))} */}

          <button className="btn btn-dark mt-5" onClick={() => setColors([])}>
            Clear Colors
          </button>
          <Button
         isDisabled={!handleSubmitButton()}
            type="submit"
            mt={5}
            isLoading={loading}
            loadingText="Submitting"
            colorScheme="purple"
            rightIcon={<ArrowForwardIcon />}
          >
            Submit
          </Button>
          {error && (
            <Box
              my={5}
              p={5}
              bg={"#ffefef"}
              border={"1px solid red"}
              borderRadius={"customA"}
            >
              <Text textColor={"#e7195a"}>{error}</Text>
            </Box>
          )}
        </form>
      </VStack>
    </div>
  );
}
