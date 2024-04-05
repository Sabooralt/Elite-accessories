import { useState } from "react";
import { useAuthContextProvider } from "./useAuthContext";
import { useReviewContext } from "./useReviewContext";

const useVoteReview = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuthContextProvider(); 
  const {dispatch} = useReviewContext();

  const voteReview = async (reviewId, voteType) => {
    setLoading(true);
    setError(null);

    try {
      // Make API request to vote on the review
      const response = await fetch("http://localhost:4000/api/reviews/vote", {
        method: "POST",
        body: JSON.stringify({ reviewId, userId: user._id, voteType }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();

      if(response.ok){
        dispatch({type: "VOTE_REVIEW",payload: json})
      }

      if (!response.ok) {
        throw new Error("Failed to vote on review");
      }

      // Handle successful response
      console.log("Vote successful:", json);
    } catch (error) {
      // Handle errors
      setError(error.message);
      console.error("Error voting:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, voteReview };
};

export default useVoteReview;
