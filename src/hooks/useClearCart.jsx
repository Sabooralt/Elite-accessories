import { useState } from "react";
import { useAuthContextProvider } from "./useAuthContext";
import { useCartContext } from "./useCartContext";

export const useClearCart = () => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState(null);
  const { dispatch } = useCartContext();
  const { user } = useAuthContextProvider();
  const [responseG, setResponseG] = useState(null);

  const clearCart = async () => {
    setIsLoading(true);
    setError(null);
    setResponseG(null);

    try {
      const response = await fetch("http://localhost:4000/api/cart/clearCart/"+user._id, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();

      if(response.ok){
        setResponseG({
            type: "success",
            message: "Cart Cleared Successfully!"
        })
        dispatch({type: "CLEAR_CART",payload: json})
      }
    } catch (error) {
        setResponseG({
            type: "error",
            message: "Network error. Please try again later.",
          });
          setError("Network error. Please try again later.");
    }
    finally{
        setIsLoading(false)
    }
  };

  return {clearCart,isLoading,error,responseG}
};
