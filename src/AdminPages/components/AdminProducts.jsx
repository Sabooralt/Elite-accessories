import{ useState } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import { SimpleGrid } from "@chakra-ui/react";

import ProductCard from "./ProductCard";

export default function AdminProducts() {
  const { products, dispatch } = useProductsContext();
  return (
    <div>
      <SimpleGrid columns={2} spacing={10}>
        {products &&
          products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
      </SimpleGrid>
    </div>
  );
}
