import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CHANGE_CURRENCY,
  CLEAR_CART,
  CREATE_ORDER_NUMBER,
  GET_STOCK_ITEMS,
  LOAD_INVOICE_DATA,
  PRINT_BILL,
  REMOVE_FROM_CART,
  SAVE_iNVOICE_DATA,
  SET_AMOUNT_RECIEVE,
  UPDATE_QUANTITY,
} from "./types";

const getStockItems = (data) => {
  return {
    type: GET_STOCK_ITEMS,
    payload: data,
  };
};

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
const calculateTotal = () => {
  return {
    type: CALCULATE_TOTAL,
  };
};
const setAmountRecieve = (amount) => {
  return {
    type: SET_AMOUNT_RECIEVE,
    payload: amount,
  };
};
const createOderNumber = () => {
  return {
    type: CREATE_ORDER_NUMBER,
  };
};
const changeCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
};

const saveDraftInvoice = (invoiceData) => {
  return {
    type: SAVE_iNVOICE_DATA,
    payload: invoiceData,
  };
};
const loadInvoiceData = (invoiceData) => {
  return {
    type: LOAD_INVOICE_DATA,
    payload: invoiceData,
  };
};
const printBill = () => {
  return {
    type: PRINT_BILL,
  };
};
const clearCart = () => {
  return {
    type: CLEAR_CART,
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
  getStockItems,
  saveDraftInvoice,
  loadInvoiceData,
  setAmountRecieve,
};
