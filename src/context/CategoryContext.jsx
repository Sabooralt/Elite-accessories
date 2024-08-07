import { createContext, useReducer } from "react";

export const CategoryContext = createContext();

export const categoryReducer = (state, action) => {
  switch (action.type) {
    case "SET_CATEGORY":
      return {
        categories: action.payload,
      };
    case "CREATE_CATEGORY":
      return {
        categories: [action.payload, ...state.categories],
      };
    case "DELETE_CATEGORY":
      return {
        categories: state.categories.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const CategoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(categoryReducer, {
    categories: null,
  });
  return (
    <CategoryContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CategoryContext.Provider>
  );
};
