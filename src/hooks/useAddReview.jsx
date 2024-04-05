import { useState } from "react";
import { useAuthContextProvider } from "./useAuthContext";
import { useReviewContext } from "./useReviewContext";


export const useAddReview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { dispatch } = useReviewContext();
  const { user } = useAuthContextProvider();
  const [responseG, setResponseG] = useState(null);

  const addreview = async (data) => {
    setIsLoading(true);
    setError(null);
    setResponseG(null);

    try {
      const response = await fetch(`http://localhost:4000/api/reviews/add/${user._id}/${data.productId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          productId: data.productId,
          rating: data.rating,
          body: data.body,
          tags: data.tags,
        }),
      });

      const json = await response.json();

      if (response.ok) {
        setResponseG({
          type: "success",
          message: "Review submitted successfully!",
        });
        dispatch({ type: "ADD_REVIEW", payload: json });
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

  return { isLoading, addreview, error, responseG };
};
