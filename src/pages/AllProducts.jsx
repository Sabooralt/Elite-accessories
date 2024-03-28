import React, { useEffect, useState } from "react";
import PrivacyScreen from "../Animations/privacyScreen";
import { Heading } from "@chakra-ui/react";
import axios from "axios";

function AllProducts() {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");

        // Check if response is successful (status code 200)
        if (response.status !== 200) {
          throw new Error("Failed to fetch products");
        }

        setProducts(response.data);
        console.log(response.data)
      } catch (error) {
        setError(error.message);
      }
    };

    fetchAllProducts();
  }, []);
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render loading state if products are still being fetched
  if (!products) {
    return <div>Loading...</div>;
  }
  const filteredProducts = products.filter(product=> product.price >= 500 ).sort((a,b)=> {return a.price - b.price}).map(product =>(
    <div key={product._id}>
          <Heading as='h1' fontSize='x-large'>{product.title}</Heading>
        </div>
  ))
  return (

    
    <div>
    
        {filteredProducts}
    
  
    </div>
  );
}
export default PrivacyScreen(AllProducts);
