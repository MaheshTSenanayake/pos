import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CHANGE_CURRENCY,
  CLEAR_CART,
  CREATE_ORDER_NUMBER,
  PRINT_BILL,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from "./types";

const addItem = (cartItem) => {
  return {
    type: ADD_TO_CART,
    payload: cartItem,
  };
};
const deleteItem = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};
const updateQuantity = (quantity) => {
  return {
    type: UPDATE_QUANTITY,
    payload: quantity,
  };
};
const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};
const calculateTotal = () => {
  return {
    type: CALCULATE_TOTAL,
  };
};
const createOderNumber = () => {
  return {
    type: CREATE_ORDER_NUMBER,
  };
};
const changeCurrency = (currency) => {
  console.log("change currency");
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
};
const printBill = () => {
  return {
    type: PRINT_BILL,
  };
};

export {
  addItem,
  deleteItem,
  printBill,
  updateQuantity,
  clearCart,
  calculateTotal,
  createOderNumber,
  changeCurrency,
};
