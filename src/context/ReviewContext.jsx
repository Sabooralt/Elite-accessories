import { useEffect, useReducer, createContext } from "react";

export const ReviewContext = createContext();

export const reviewReducer = (state, action) => {
  switch (action.type) {
    case "GET_REVIEWS":
      return {
        ...state,
        reviews: action.payload,
        error: null,
      };
    case "ADD_REVIEW":
      return {
        ...state,
        reviews: [action.payload, ...state.reviews],
        error: null,
      };
    case "REMOVE_REVIEW":
      return {
        ...state,
        reviews: state.reviews.filter(
          (item) => item._id !== action.payload._id
        ),
        error: null,
      };
    case "VOTE_REVIEW":
      // Update the review in the state with the updated review from the payload
      const updatedReview = action.payload;
      const updatedReviews = state.reviews.map((item) => {
        if (item.review._id === updatedReview._id) {
      
          return { ...item, review: updatedReview };
        }
        // Otherwise, return the original item
        return item;
      });

      return {
        ...state,
        reviews: updatedReviews,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const ReviewContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reviewReducer, {
    reviews: [],
    error: null,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/reviews/");
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const json = await response.json();
        dispatch({ type: "GET_REVIEWS", payload: json });
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    };

    fetchReviews();
  }, [dispatch]);

  console.log("ReviewContext state: ", state);

  return (
    <ReviewContext.Provider value={{ state, dispatch }}>
      {children}
    </ReviewContext.Provider>
  );
};
