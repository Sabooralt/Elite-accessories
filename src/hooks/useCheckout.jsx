import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContextProvider } from "./useAuthContext";
import { useToast } from "@chakra-ui/react";
import { useClearCart } from "./useClearCart";
import { useNavigate } from "react-router-dom";

export const useCheckOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [responseG, setResponseG] = useState(null);
  const [checkoutSuccess,setCheckoutSuccess] = useState(false);
  const {clearCart} = useClearCart();
  const navigate = useNavigate();
  const { user } = useAuthContextProvider();
  const toast = useToast();

  const Checkout = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/checkout/create",
        {
          ...data,
          userId: user._id,
        }
      );

      if (response.status === 201) {
        setResponseG({
          type: "success",
          message:
            "Your order has been successfully placed. Thank you for shopping with us! \n You'll be redirected to the homepage in 5s",
        });

        clearCart();
        setCheckoutSuccess(true)
      }
      setIsLoading(false);
    } catch (error) {
      setResponseG({
        type: "error",
        message:
          "Sorry, we couldn't process your order at this time. Please try again later",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (checkoutSuccess) {
      const timeout = setTimeout(() => {
        navigate("/");
        toast.closeAll();
      }, 5000);


      return () => clearTimeout(timeout);
    }
  }, [checkoutSuccess, navigate]);

  return { Checkout, responseG, isLoading };
};
