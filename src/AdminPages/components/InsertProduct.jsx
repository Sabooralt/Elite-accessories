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
  Select,
  IconButton,
  UnorderedList,
  ListItem,
  FormHelperText,
  TagCloseButton,
  Tag,
  HStack,
  TagLabel,
} from "@chakra-ui/react";
import { FiTrash } from "react-icons/fi";

import React, { useEffect, useRef, useState } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import axios from "axios";

export default function InsertProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [description, setDescription] = useState("");
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [phoneModels, setPhoneModels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [images, setImages] = useState([]);
  const { state: productsState, dispatch: productsDispatch } = useProductsContext();
  const { categories, dispatch: categoryDispatch } = useCategoryContext();
  const [showToast, setShowToast] = useState(false);
  const toast = useToast();
  const [newPhoneModel, setNewPhoneModel] = useState("");

  //Multiple colors functionality

  const handleAddColor = () => {
    if (newColor.trim() !== "") {
      setColors([...colors, newColor]);
      setNewColor("");
    }
  };

  const handleColorInputChange = (e) => {
    setNewColor(e.target.value);
  };

  const handleRemoveColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  // Phone Models functionality

  const handleAddPhoneModel = () => {
    if (newPhoneModel.trim() !== "") {
      setPhoneModels([...phoneModels, newPhoneModel]);
      setNewPhoneModel(""); // Reset input field
    }
  };

  const handleInputChange = (e) => {
    setNewPhoneModel(e.target.value);
  };

  const handleRemovePhoneModel = (index) => {
    const updatedPhoneModels = phoneModels.filter((_, i) => i !== index);
    setPhoneModels(updatedPhoneModels);
  };

  const handleChange = (e) => {
    // covert images to array
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  };


  const handleSubmitButton = () => {
    // submit button state
    if (
      title === "" ||
      price === null ||
      selectedCategory === null ||
      description === ""
    ) {
      return false; // Disable button if any required field is empty or null
    }

    if (
      !colors ||
      colors.length === 0 ||
      !images ||
      images.length === 0 ||
      !phoneModels ||
      phoneModels.length === 0
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", selectedCategory);
    formData.append("colors", JSON.stringify(colors));
    formData.append("phoneModels", JSON.stringify(phoneModels));

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    try {
      const response = await axios.post(
        "http://localhost:4000/api/products",
        formData,
        {
          headers: {
            "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
          },
        }
      );

      if (response.status === 200) {
        setTitle("");
        setPrice(0);
        setDescription("");
        setColors([]);
        setPhoneModels([]);
        productsDispatch({ type: "CREATE_PRODUCT", payload: response.data });

        toast({
          title: `${title} Created!`,
          description: `${title} was successfully created!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        setError(response.data.error);
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
          encType="multipart/form-data"
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
            <Select
              id="category"
              bg="white"
              color="textC"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              variant="flushed"
              placeholder="Select Category"
            >
              {categories &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
            </Select>
            <FormHelperText>
              Note: I didn't add any validation on this input. So, even if the
              value of Category is 'Select Category', the form will submit with
              that text. Therefore, make sure to double-check this field before
              submitting!
            </FormHelperText>
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
            <VStack className="text-white" border="1px solid #fff" p="5">
              <Text m={0}>Add Color:</Text>
              <FormHelperText>Click on the input to choose a color to add.(You can choose multiple)</FormHelperText>
              <Input
                placeholder="Add Phone Model"
                bg={"white"}
                color={"black"}
                type="color"
                id="newPhoneModel"
                value={newColor}
                onChange={handleColorInputChange}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddColor}
              >
                Add Color
              </button>

              <Text mb={0} mt={2}>
               Colors picked:
              </Text>
              <HStack w="100%">
                {colors.map((color, index) => (
                  <Tag
                    key={index}
                    className="d-flex justify-content-between p-2"
                    bg={color}
                    color={'grey.500'}
                  >
                    <TagLabel>{color}</TagLabel>
                    
                    <TagCloseButton onClick={() => handleRemoveColor(index)}/>
                  </Tag>
                ))}
              </HStack>
            </VStack>
          </FormControl>
          <FormControl mt="5">
            <VStack className="text-white" border="1px solid #fff" p="5">
              <Text>Add Phone Model:</Text>
              <Input
                placeholder="Add Phone Model"
                bg={"white"}
                color={"black"}
                type="text"
                id="newPhoneModel"
                value={newPhoneModel}
                onChange={handleInputChange}
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddPhoneModel}
              >
                Add Phone Model
              </button>

              <Text mb={0} mt={2}>
                Phone Models picked:
              </Text>
              <UnorderedList w="100%">
                {phoneModels.map((model, index) => (
                  <ListItem
                    key={index}
                    className="d-flex justify-content-between p-2"
                  >
                    {model}{" "}
                    <IconButton
                      colorScheme="teal"
                      icon={<FiTrash />}
                      onClick={() => handleRemovePhoneModel(index)}
                    />
                  </ListItem>
                ))}
              </UnorderedList>
            </VStack>
          </FormControl>
          <FormControl mt="5">
            <Text color={"white"}>Images:</Text>
            <Input
              name="images"
              id="images"
              type="file"
              onChange={handleChange}
              multiple
              accept="image/*"
            />
          </FormControl>

          <Stack
            direction={"row"}
            mt="5"
            style={{ gap: 20, overflow: "scroll" }}
          >
            {images &&
              images.map((image, index) => (
                <Image
                  key={index}
                  boxSize="250px"
                  objectFit="cover"
                  src={URL.createObjectURL(image)}
                  alt={`Image ${index}`}
                />
              ))}
          </Stack>

          {/*  {colors &&
            colors.map((color, index) => (
              <div key={index} style={{ backgroundColor: color }}>
                {`Color ${index + 1}: ${color}`}
              </div>
            ))} */}

          <FormControl className="w-100">
            <FormHelperText>
              If the submit button is disabled, that means you have left some
              fields empty. Fill all the fields, and then you'll be able to
              submit easily.
            </FormHelperText>

            <Button
            className="w-100"
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
          </FormControl>

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
