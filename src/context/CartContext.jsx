import { useEffect, useState, useReducer, createContext } from "react";
import { useAuthContextProvider } from "../hooks/useAuthContext";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "GET_CART":
      return {
        items: action.payload,
      };
      case "ADD_TO_CART":
        const existingItemIndex = state.items.findIndex(
          (item) => item._id === action.payload.product._id
        );
      
        if (existingItemIndex !== -1) {
          const updatedItems = [...state.items];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + action.payload.quantity
          };
          return { ...state, items: updatedItems };
        } else {
          return { ...state, items: [...state.items, action.payload] };
        }
      case "REMOVE_FROM_CART":
        const filteredItems = state.items.filter(
          (item) => item._id !== action.payload._id
        );
        return { ...state, items: filteredItems };
        case "CLEAR_CART":
          return { ...state, items: [] };
    case "UPDATE_QUANTITY":
      const updatedItems = state.items.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });
      return { ...state, items: updatedItems };
    default:
      return state;
  }
};
export const CartContextProvider = ({ children }) => {
  const { user } = useAuthContextProvider();
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });
  useEffect(() => {
    
      const fetchCartItems = async () => {
        const response = await fetch(
          "http://localhost:4000/api/cart/" + user._id
        );
        const json = await response.json();
        if (response.ok) {
          dispatch({ type: "GET_CART", payload: json });
        }
        if (!response.ok) {
          console.log("cannot get cart items");
        }

        console.log("cart", json);
      };
    fetchCartItems();
    
  }, [dispatch,user]);
  console.log("CartContext state: ", state);
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
