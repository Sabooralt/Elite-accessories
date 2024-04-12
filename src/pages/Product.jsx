import {
  Box,
  Divider,
  Flex,
  Grid,
  HStack,
  Heading,
  IconButton,
  Image,
  Skeleton,
  Stack,
  Tag,
  TagCloseButton,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState, useRef } from "react";
import { ReviewsCard, StarRating } from "../components/ReviewsCard";
import FilledStarRating from "../components/FilledStarRating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCards, Autoplay } from "swiper/modules";

import "swiper/css";
import "../Swiper.css";
import "swiper/css/pagination";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { GlobalButton } from "../components/GlobalButton";
import { PiShoppingCartLight } from "react-icons/pi";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "../hooks/useProductsContext";
import { useAddToCart } from "../hooks/useAddToCart";
import { AnimatePresence, motion } from "framer-motion";
import { useReviewContext } from "../hooks/useReviewContext";

export default function Product() {
  const [selectedColor, setSelectedColor] = useState(null);
  const [showBlur, setShowBlur] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products } = useProductsContext();
  const { addtocart, responseG } = useAddToCart();
  const toast = useToast();
  const product = products.find((product) => product._id === productId);
  const { state } = useReviewContext();
  const { reviews } = state;

  const filteredReviews = reviews.filter(
    (review) => review.review.productId === productId.toString()
  );

  const handleAddToCart = () => {
    addtocart({
      productId: product._id,
      color: selectedColor,
      quantity: 1,
    });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      setShowBlur(true);
      document.body.style.overflow = "hidden";
    }, 200);

    return () => {
      clearTimeout(delay);
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (responseG) {
      toast({
        title: responseG.title,
        description: responseG.message,
        isClosable: true,
        status: responseG.type,
      });
      if (responseG.type === "success") {
        toast({
          title: responseG.title,
          description: responseG.message,
          isClosable: true,
          status: responseG.type,
        });
        setSelectedColor(null);
      }
    }
  }, [responseG]);

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleTagClick = (model) => {
    setSelectedModel(model === selectedModel ? null : model);
  };

  const handleTagClose = () => {
    setSelectedModel(null);
  };
  const handleNavigate = () => {
    navigate("/products", { replace: true });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Box
      as="main"
      sx={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        willChange: "transition background-color backdrop-filter",
        overflow: "scroll",

        transition: "all 0.5s ease-in-out",
        ...(showBlur && {
          backdropFilter: "blur(3px)",
          backgroundColor: "rgb(255 255 255 / 9%)",
        }),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <AnimatePresence mode="wait">
        {productId && (
          <Flex
            as={motion.div}
            key={productId}
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { delay: 0.2, duration: 0.7 },
            }}
            exit={{ opacity: 0, y: -100 }}
            className="beforeBG"
            sx={{
              position: "absolute",
              placeItems: "center",
              display: "flex",
              width: "90%",
              maxHeight: "90vh",
              overflow: "scroll",

              backgroundColor: "#000",
              backgroundImage: "url(/coverWhite.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              bottom: 0,
              borderTopRadius: "60px",
              overflow: "hidden",
              border: "4px solid #000",
              justifyContent: "flex-start",
            }}
          >
            <Box
              h={"100%"}
              maxW={"500px"}
              borderRight={"2px solid #000"}
              zIndex="3"
            >
              <Swiper
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                effect={"cards"}
                grabCursor={true}
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination, EffectCards, Autoplay]}
                className="mySwiper"
              >
                {product.images ? (
                  product.images.map((image) => (
                    <SwiperSlide>
                      <Image src={image.filepath} />
                    </SwiperSlide>
                  ))
                ) : (
                  <Skeleton height="100%" width="100%" />
                )}
              </Swiper>
            </Box>
            <VStack
              maxH={"90vh"}
              overflow={"scroll"}
              textTransform="capitalize"
              zIndex={3}
              color="primaryLight"
              p="10"
              h="100%"
              width="100%"
              display="flex"
              flexDir="column"
              justifyContent="start"
              alignItems="baseline"
              fontWeight="500"
              spacing={5}
            >
              <VStack alignItems={"baseline"} spacing={0}>
                <Heading
                  fontWeight="550"
                  fontSize="2.6rem"
                  textTransform="capitalize"
                >
                  {product.title}
                </Heading>
                <HStack spacing={0}>
                  <FilledStarRating rating={product.rating} />
                </HStack>
              </VStack>

              <VStack mt={3} alignItems="baseline">
                <Box
                  sx={{
                    position: "absolute",
                    right: "20px",
                    top: "25px",
                  }}
                >
                  <IconButton
                    onClick={() => handleNavigate()}
                    variant="unstyled"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    minW="25px"
                    borderRadius={"50%"}
                    h={"25px"}
                    bg={"primary"}
                    icon={<SmallCloseIcon fontSize={"larger"} color="#000" />}
                  />
                </Box>
                <Heading
                  fontSize="x-large"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  Description
                </Heading>

                <Text
                  fontSize={"medium"}
                  maxH="80px"
                  overflow={"scroll"}
                  textOverflow="ellipsis"
                >
                  {product.description}
                </Text>
              </VStack>

              <VStack alignItems="baseline">
                <Heading
                  fontSize="x-large"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  Colors
                </Heading>
                <HStack spacing={1}>
                  {product.colors.length > 0 ? (
                    JSON.parse(product.colors).map((color, index) => (
                      <Box
                        key={index}
                        w={30}
                        height={30}
                        borderRadius="50%"
                        bg={color}
                        border={selectedColor === color ? "2px solid #fff" : 0}
                        opacity={selectedColor === color ? 1 : 0.7}
                        onClick={() => handleColorClick(color)}
                      ></Box>
                    ))
                  ) : (
                    <></>
                  )}
                </HStack>
              </VStack>

              <VStack spacing={1} alignItems="baseline">
                <HStack justifyContent="space-between">
                  <Heading
                    fontSize="x-large"
                    fontWeight="600"
                    textTransform="uppercase"
                  >
                    Models
                  </Heading>
                </HStack>

                <HStack>
                  {product.phoneModels.length > 0 ? (
                    JSON.parse(product.phoneModels).map((model) => (
                      <Tag
                        key={model}
                        textTransform="capitalize"
                        cursor="pointer"
                        px={3}
                        py={1}
                        variant={model === selectedModel ? "solid" : "outline"}
                        fontWeight={600}
                        bg="#f2f2f2"
                        color={"textC"}
                        onClick={() => handleTagClick(model)}
                      >
                        {model}
                        {selectedModel === model && (
                          <TagCloseButton onClick={handleTagClose} />
                        )}
                      </Tag>
                    ))
                  ) : (
                    <Tag
                      key={product.phoneModels}
                      textTransform="capitalize"
                      cursor="pointer"
                      px={3}
                      py={1}
                      variant={
                        product.phoneModels === selectedModel
                          ? "solid"
                          : "outline"
                      }
                      fontWeight={600}
                      bg="#f2f2f2"
                      color={"textC"}
                      onClick={() => handleTagClick(product.phoneModels)}
                    >
                      {product.phoneModels}
                      {selectedModel === product.phoneModels && (
                        <TagCloseButton onClick={handleTagClose} />
                      )}
                    </Tag>
                  )}
                </HStack>
              </VStack>

              <VStack alignItems="baseline">
                <Heading
                  fontSize="x-large"
                  fontWeight="600"
                  textTransform="uppercase"
                >
                  service
                </Heading>
                <HStack spacing={2} alignItems="center">
                  <IconButton
                    pointerEvents={"none"}
                    variant="unstyled"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    minW="22px"
                    borderRadius={"50%"}
                    h={"22px"}
                    bg={"primary"}
                    icon={<FaCheck fontSize={"small"} color="#000" />}
                  />

                  <Text m={0} fontSize={"medium"} textTransform="capitalize">
                    14 days free & easy return
                  </Text>
                </HStack>

                <HStack spacing={2}>
                  <IconButton
                    pointerEvents={"none"}
                    variant="unstyled"
                    display={"flex"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    minW="22px"
                    borderRadius={"50%"}
                    h={"22px"}
                    bg={"red"}
                    icon={<SmallCloseIcon fontSize={"larger"} color="#000" />}
                  />
                  <Text m={0} fontSize={"medium"} textTransform="capitalize">
                    Warranty not available
                  </Text>
                </HStack>
              </VStack>

              <HStack
                w="100%"
                alignItems={"center"}
                display="flex"
                justifyContent="center"
              >
                <GlobalButton
                  fontSize="large"
                  bg={"primary"}
                  fontWeight={600}
                  boxShadow="0"
                  borderRadius="customA"
                >
                  Place Order
                </GlobalButton>
                <GlobalButton
                  fontSize="large"
                  bg={"primary"}
                  fontWeight={600}
                  boxShadow="0"
                  borderRadius="customA"
                  rightIcon={<PiShoppingCartLight size={23} />}
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </GlobalButton>
                <Tooltip label="Add to favourites">
                  <Box cursor={"pointer"}>
                    <svg
                      width="40"
                      height="35"
                      viewBox="0 0 40 35"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.26168 19.5222L19.0198 32.4465C19.4937 32.8917 19.7307 33.1143 20.0101 33.1691C20.1359 33.1938 20.2653 33.1938 20.3911 33.1691C20.6705 33.1143 20.9075 32.8917 21.3814 32.4465L35.1395 19.5222C39.0105 15.8858 39.4805 9.90182 36.2249 5.70563L35.6127 4.91661C31.718 -0.10324 23.9003 0.738628 21.1636 6.47259C20.7771 7.28254 19.6241 7.28255 19.2376 6.47259C16.5009 0.738628 8.6832 -0.103243 4.78849 4.9166L4.17632 5.70562C0.920649 9.90182 1.39072 15.8858 5.26168 19.5222Z"
                        fill="#E31F1F"
                        fill-opacity="0.95"
                        stroke="black"
                        stroke-width="2.77038"
                      />
                    </svg>
                  </Box>
                </Tooltip>
              </HStack>
              <Divider />
              <Stack w="100%">
                <Heading>Reviews</Heading>

                <Grid templateColumns="repeat(1,1fr)" gap={4}>
                  {filteredReviews.length === 0 ? (
                    <Text>No reviews found for this product.</Text>
                  ) : (
                    filteredReviews.map(({ review, user, product }) => (
                      <ReviewsCard
                        key={review._id}
                        review={review}
                        reviewBy={user}
                        product={product}
                      ></ReviewsCard>
                    ))
                  )}
                </Grid>
              </Stack>
            </VStack>
          </Flex>
        )}
      </AnimatePresence>
    </Box>
  );
}
