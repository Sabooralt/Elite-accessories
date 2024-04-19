import React from "react";
import { useProductsContext } from "../hooks/useProductsContext";
import {
  VStack,
  Text,
  Box,
  HStack,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import ProductCard from "../components/ProductCard";

export default function AllProducts() {
  const { products } = useProductsContext();
  const array = [1, 2, 3, 4, 5, 6];
  return (
    <Grid templateColumns="repeat(4, 1fr)" m={10} gap={7} wrap={"wrap"}>
      {!products &&
        array.map((item) => (
          <GridItem >
            <Skeleton
              padding="6"
              borderRadius={15}
              height={400}
              boxShadow="lg"
              bg="white"
            >
              <SkeletonCircle size="10" />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Skeleton>
          </GridItem>
        ))}
      <AnimatePresence>
        {products &&
          products.map((product, index) => (
            <motion.div
              key={product._id}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1 * index, duration: 1 }}
              initial={{ opacity: 0, y: 20 }}
            >
              <GridItem colSpan="1">
                <ProductCard product={product} />
              </GridItem>
            </motion.div>
          ))}
      </AnimatePresence>
    </Grid>
  );
}
