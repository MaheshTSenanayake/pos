import { ADD_TO_CART, REMOVE_FROM_CART } from "./types";

const addItem = (cartItems) => {
  return {
    type: ADD_TO_CART,
    payload: cartItems,
  };
};
const deleteItem = () => {
  return {
    type: REMOVE_FROM_CART,
  };
};

export { addItem, deleteItem };
