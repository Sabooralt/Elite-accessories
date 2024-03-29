import React, { useEffect } from "react";
import { useProductsContext } from "../../hooks/useProductsContext";
import axios from "axios";
import { Heading } from "@chakra-ui/react";

export default function AdminProducts() {
  const { products, dispatch } = useProductsContext();

  useEffect(() => {
    const fetchAllProducts = async () => {
      const response = await fetch("http://localhost:4000/api/products");
      const data = await response.json();
      
      console.log(products)
     console.log(data)
      if (response.ok) {
        dispatch({ type: "SET_PRODUCTS", payload: data });
      }
    };

    fetchAllProducts();
  }, [dispatch]);

 

  return (
    <div>
      {products &&
        products.map(product => (
          <div key={product._id}>
            <Heading>{product.title}</Heading>
          </div>
        ))}
    </div>
  );
}
