import {
  Box,
  Center,
  Container,
  HStack,
  Heading,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { GlobalButton } from "../components/GlobalButton";
import CheadingComponent from "../components/CheadingComponent";
import ProductCard from "../components/ProductCard";
import ProductCarouselH from "../components/ProductCarouselH";
import { FiFilter } from "react-icons/fi";
import PrivacyScreen from "../Animations/privacyScreen";
import { Link, useParams } from "react-router-dom";
import Product from "./Product";

 function  Home() {

  const { productId } = useParams();
 

  return (
    <>
    {productId && <Product/>}
    <Box pt={'0 !important'} p={{base: 4, sm: 6 ,md: 6,lg:20 ,xl: 20}} position={'relative'}>
      <CheadingComponent>Leather Cases</CheadingComponent>
      <HStack w={"100%"} mt={4} alignItems={"center"} position={'relative'}>
        <Link to='/products'>
        <GlobalButton bg={"primary"} p={"0 0.7em"}>
          Show All
        </GlobalButton>
        </Link>

        <FiFilter style={{}} size={29} />
      </HStack>

      <HStack w={"100%"} mt={3}>
        <ProductCarouselH />
      </HStack>

    </Box>
    <Box pt={'0 !important'} p={{base: 4, sm: 6 ,md: 6,lg:20 ,xl: 20}} position={'relative'}>
      <CheadingComponent>Leather Cases</CheadingComponent>
      <HStack w={"100%"} alignItems={"center"}position={'relative'}>
        <GlobalButton bg={"primary"} p={"0 0.7em"}>
          Show All
        </GlobalButton>

        <FiFilter style={{}} size={29} />
      </HStack>

      <HStack w={"100%"} mt={3}>
        <ProductCarouselH />
      </HStack>

    </Box>


    </>

  );
}export default Home;
