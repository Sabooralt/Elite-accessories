import { useState } from "react";
import { useAuthContextProvider } from "./useAuthContext";
import { useCartContext } from "./useCartContext";

export const useAddToCart = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useCartContext();
  const { user } = useAuthContextProvider();
  const [responseG, setResponseG] = useState(null);

  const addtocart = async (data) => {
    setIsLoading(true);
    setError(null);
    setResponseG(null);

    try {
      const response = await fetch("http://localhost:4000/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: data.productId,
          quantity: data.quantity,
          color: data.color,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setResponseG({
          type: "success",
          message: "Item added to cart successfully. View cart.",
        });
        dispatch({ type: "ADD_TO_CART", payload: json });
      } else {
        setResponseG({
          type: "error",
          message: json.error || "Unknown error occurred.",
        });
        setError(json.error || "Unknown error occurred.");
      }
    } catch (error) {
      setResponseG({
        type: "error",
        message: "Network error. Please try again later.",
      });
      setError("Network error. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, addtocart, error, responseG };
};
