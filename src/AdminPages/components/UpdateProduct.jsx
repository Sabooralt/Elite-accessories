import {
  Box,
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  ListItem,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  UnorderedList,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useCategoryContext } from "../../hooks/useCategoryContext";
import { Navigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { FiTrash } from "react-icons/fi";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useProductsContext } from "../../hooks/useProductsContext";

export default function UpdateProduct() {
  //States
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [newColor, setNewColor] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [colors, setColors] = useState([]);
  const [phoneModels, setPhoneModels] = useState([]);
  const [newPhoneModel, setNewPhoneModel] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formTouched, setFormTouched] = useState(false);
  const toast = useToast();

  const { categories } = useCategoryContext();
  const { dispatch } = useProductsContext();

  //States End

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/products/" + productId
        );
        const productData = response.data;

        const processedColors = productData.colors.map((colorString) => {
          const cleanedColorString = colorString.replace(
            /^"?\[?"?|"?]?"?$/g,
            ""
          );
          return cleanedColorString;
        });

        // Set product and processed colors in the state
        setProduct(productData);
        setPrice(productData.price);
        setTitle(productData.title);
        setDescription(productData.description);
        setSelectedCategory(productData.category);
        setColors(processedColors);
        setPhoneModels(productData.phoneModels);
        setImages(productData.images);
        console.log(selectedCategory);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmitButton = () => {
    if (title === "" || price === 0 || description === "" || !formTouched) {
      return true;
    } else {
      return false;
    }
  };

  const handleInputChange = () => {
    setFormTouched(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title,
      price,
      description,
      colors,
      phoneModels,
      selectedCategory,
    };

    try {
      const response = await fetch(
        `http://localhost:4000/api/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const json = await response.json();

      if (response.status === 200) {
        toast({
          title: `Product Updated!`,
          description: `${title} was successfully updated!`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        console.log("submitted");
        setTitle("");
        setPrice(0);
        setDescription("");
        setPhoneModels([""]);
        setColors([""]);
        setNewPhoneModel("");
        setLoading(false);
        dispatch({ type: "UPDATE_PRODUCT", payload: json });
      }
    } catch (error) {
      toast({
        title: `Please try again later!!`,
        description: `${error}!`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    } finally {
      Navigate({ to: "admin/productmanagement" });
      setLoading(false);
    }
  };
  const handleAddColor = () => {
    if (newColor.trim() !== "") {
      setColors([...colors, newColor]);
      setNewColor("");
    }
  };
  const handleRemoveColor = (index) => {
    const updatedColors = colors.filter((_, i) => i !== index);
    setColors(updatedColors);
  };

  const handleAddPhoneModel = () => {
    if (newPhoneModel.trim() !== "") {
      setPhoneModels([...phoneModels, newPhoneModel]);
      setNewPhoneModel(""); // Reset input field
    }
  };
  const handleRemovePhoneModel = (index) => {
    const updatedPhoneModels = phoneModels.filter((_, i) => i !== index);
    setPhoneModels(updatedPhoneModels);
  };

  return (
    <div className="container p-5">
      <Heading>
        Update: <em>{product && product.title}</em>
      </Heading>

      <form
        onClick={(e) => setFormTouched(true)}
        onSubmit={handleSubmit}
        style={{ backgroundColor: "#fff" }}
        className="p-5 "
        encType="multipart/form-data"
      >
        <FormControl>
          <FormLabel>Product Title</FormLabel>
          <Input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Price</FormLabel>
          <Input
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Product Category:</FormLabel>

          <Select
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            {categories &&
              categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Product Description</FormLabel>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>
        <VStack className="text-center justify-content-center align-items-center">
          <FormControl>
            <FormHelperText>
              You can remove and add new colors. Make the changes and submit the
              form to update the product.
            </FormHelperText>
            <Input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
          </FormControl>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleAddColor}
          >
            Add Color
          </button>
          <FormLabel>Current Colors:</FormLabel>

          <HStack w="100%" alignItems={"center"} justifyContent={"center"}>
            {colors &&
              colors.map((color, index) => (
                <Tag
                  key={index}
                  className="d-flex justify-content-between p-2"
                  bg={color}
                  color={"grey.500"}
                >
                  <TagLabel>{color}</TagLabel>

                  <TagCloseButton onClick={() => handleRemoveColor(index)} />
                </Tag>
              ))}
          </HStack>
        </VStack>
        <VStack className="text-black" border="1px solid #fff" p="5">
          <Text>Add Phone Model:</Text>
          <FormControl>
            <Input
              placeholder="Add Phone Model"
              type="text"
              id="newPhoneModel"
              value={newPhoneModel}
              onChange={(e) => setNewPhoneModel(e.target.value)}
            />
          </FormControl>

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
                className="d-flex justify-content-between p-2 text-black"
              >
                {model.toString()}
                <IconButton
                  colorScheme="teal"
                  icon={<FiTrash />}
                  onClick={() => handleRemovePhoneModel(index)}
                />
              </ListItem>
            ))}
          </UnorderedList>
        </VStack>
        <FormControl>
        <FormHelperText>
  If the submit button is disabled, that means you haven't interacted
  with the form at all. You need to interact with it once for it to work.
</FormHelperText>
          <Button
            className="w-100"
            isDisabled={handleSubmitButton()}
            type="submit"
            mt={5}
            isLoading={loading}
            loadingText="Submitting"
            rightIcon={<ArrowForwardIcon />}
            colorScheme="pink"
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

        {/*  <FormControl mt="5">
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
              images.map((image,index) => (
                <Box key={image._id}>
              <IconButton icon={<FiTrash/>} onClick={()=> handleRemoveImage(index)}/>
                <Image
                  key={image._id}
                  boxSize="250px"
                  objectFit="cover"
                  src={image.filepath}
                  alt={image._id}
                  />
                  </Box>
              ))}
          </Stack> */}

        {/*  <VStack className="text-white" border="1px solid #fff" p="5">
                <Text m={0}>Add Color:</Text>
                <FormHelperText>Click on the input to choose a color to add.(You can choose multiple)</FormHelperText>
               
                </button>
  
                <Text mb={0} mt={2}>
                 Colors picked:
                </Text>
              </VStack>  */}
      </form>
    </div>
  );
}
