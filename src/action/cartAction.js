import { ADD_TO_CART, PRINT_BILL, REMOVE_FROM_CART } from "./types";

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

const printBill = () => {
  return {
    type: PRINT_BILL,
  };
};

export { addItem, deleteItem, printBill };
