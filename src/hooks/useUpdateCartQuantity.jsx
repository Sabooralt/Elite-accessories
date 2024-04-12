import { useState } from "react";
import { useCartContext } from "./useCartContext";

export const useUpdateCartQuantity = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseG, setResponseG] = useState(null);
  const [error, setError] = useState(null);
  const { items,dispatch } = useCartContext();

  const updateQuantity = async (id, operation) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:4000/api/cart/update-quantity/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ operation: operation }),
        }
      );
      const json = await response.json();

      if(response.ok){
dispatch({type: "UPDATE_QUANTITY",payload: json})

      }


      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return { isLoading, updateQuantity, error, responseG };
};
