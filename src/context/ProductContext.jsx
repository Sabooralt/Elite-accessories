import { createContext, useReducer } from "react";

export const ProductsContext = createContext();

export const productsReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return {
        products: action.payload,
      };
    case "CREATE_PRODUCT":
      console.log("UPDATE_PRODUCT action received with payload:", action.payload);
      return {
        products: [action.payload, ...state.products],
      };
    case "DELETE_PRODUCT":
      return {
        products: state.products.filter((w) => w._id !== action.payload._id),
      };
      case "UPDATE_PRODUCT":
        console.log("UPDATE_PRODUCT action received with payload:", action.payload);
        return {
          products: state.products.map(product =>
            product._id === action.payload._id ? action.payload : product
          )
        };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: null,
  });
  return (
    <ProductsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};
