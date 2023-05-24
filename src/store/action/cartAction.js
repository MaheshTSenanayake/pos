import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CHANGE_CURRENCY,
  CLEAR_CART,
  CREATE_NEW_INVOICE,
  CREATE_ORDER_NUMBER,
  GET_STOCK_ITEMS,
  LOAD_INVOICE_DATA,
  PRINT_BILL,
  REMOVE_FROM_CART,
  SAVE_INVOICE_DATA,
  SAVE_PAYMENT_DATA,
  SET_AMOUNT_RECIEVE,
  UPDATE_QUANTITY,
} from "./types";

//Load Stock data
const getStockItems = (data) => {
  return {
    type: GET_STOCK_ITEMS,
    payload: data,
  };
};
//Add item to cart list
const addItem = (cartItem) => {
  return {
    type: ADD_TO_CART,
    payload: cartItem,
  };
};
//Remove item from cart
const deleteItem = (id) => {
  return {
    type: REMOVE_FROM_CART,
    payload: id,
  };
};
//Update cart items and stock items quantity 
const updateQuantity = (quantity) => {
  return {
    type: UPDATE_QUANTITY,
    payload: quantity,
  };
};
//Calculate cart items total
const calculateTotal = () => {
  return {
    type: CALCULATE_TOTAL,
  };
};
//Get the received amount that gave by the customer
const setAmountRecieve = (amount) => {
  return {
    type: SET_AMOUNT_RECIEVE,
    payload: amount,
  };
};
//Toggle currency between usd and lkr
const changeCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: currency,
  };
};
//remove all items from cart
const clearCart = (cartItems) => {
  return {
    type: CLEAR_CART,
    payload: cartItems,
  };
};
//Create new order number for new order
const createOderNumber = () => {
  return {
    type: CREATE_ORDER_NUMBER,
  };
};
//Assign new invoice value to current invoice
const createNewInvoice = (invoiceData) => {
  return {
    type: CREATE_NEW_INVOICE,
    payload: invoiceData,
  };
};
//Save invoice data
const saveDraftInvoice = (invoiceStatus) => {
  return {
    type: SAVE_INVOICE_DATA,
    payload: invoiceStatus,
  };
};
//Save pamet data for current invoice
const savePayment = (paymentData) => {
  return {
    type: SAVE_PAYMENT_DATA,
    payload: paymentData,
  };
};
//Load invoice from invoice list
const loadInvoiceData = (invoiceData) => {
  return {
    type: LOAD_INVOICE_DATA,
    payload: invoiceData,
  };
};
//Create invoice pdf
const printBill = () => {
  return {
    type: PRINT_BILL,
  };
};

export {
  getStockItems,
  addItem,
  updateQuantity,
  deleteItem,
  calculateTotal,
  clearCart,
  setAmountRecieve,
  createNewInvoice,
  printBill,
  createOderNumber,
  changeCurrency,
  saveDraftInvoice,
  loadInvoiceData,
  savePayment,
};
