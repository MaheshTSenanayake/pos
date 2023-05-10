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
  UPDATE_QUANTITY,
  UPDATE_STOCK_QUANTITY,
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
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
};
const getStockItems = (data) => {
  return {
    type: GET_STOCK_ITEMS,
    payload: data,
  };
};
const saveDraftInvoice = (invoiceData) => {
  return {
    type: SAVE_iNVOICE_DATA,
    payload: invoiceData,
  };
};
const updateStockQuantity = (id, status) => {
  return {
    type: UPDATE_STOCK_QUANTITY,
    payload: id,
    status: status,
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
  updateStockQuantity,
  loadInvoiceData,
};
