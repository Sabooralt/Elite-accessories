import { Box, Center, Container, HStack, Heading } from "@chakra-ui/react";
import React from "react";
import { GlobalButton } from "../components/GlobalButton";
import CheadingComponent from "../components/CheadingComponent";
import ProductCard from "../components/ProductCard";

export default function () {
  return (
    <>
      <CheadingComponent>Leather Cases</CheadingComponent>

      <HStack spacing={20} px={20} mt={2}>
        <ProductCard prize={1000}>red leather case</ProductCard>
        <ProductCard prize={1000}>red leather case</ProductCard>
        <ProductCard prize={1000}>red leather case</ProductCard>
        <ProductCard prize={1000}>red leather case</ProductCard>
        <ProductCard prize={1000}>red leather case</ProductCard>
      </HStack>
    </>
  );
}
