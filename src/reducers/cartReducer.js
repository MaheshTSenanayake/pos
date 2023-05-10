import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CHANGE_CURRENCY,
  CLEAR_CART,
  CREATE_ORDER_NUMBER,
  GET_STOCK_ITEMS,
  LOAD_INVOICE_DATA,
  REMOVE_FROM_CART,
  SAVE_iNVOICE_DATA,
  UPDATE_QUANTITY,
  UPDATE_STOCK_QUANTITY,
} from "../action/types";

const initialState = {
  cartItems: [],
  orderNumber: 1,
  total: { lkr: 0, usd: 0 },
  currency: "LKR",
  invoiceList: [],
  category: [],
  stockItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = { ...action.payload, quantity: 1 };
      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
    case REMOVE_FROM_CART:
      const removeQty = state.cartItems.filter(
        (item) => item._id === action.payload
      )[0].quantity;
      const updatededStocItems = state.stockItems.map((stockItem) =>
        stockItem._id === action.payload
          ? { ...stockItem, stockQuantity: stockItem.stockQuantity + removeQty }
          : stockItem
      );
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
        stockItems: updatededStocItems,
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
      };
    case UPDATE_QUANTITY:
      const updatedObjectArray = state.cartItems.map((cartItem) =>
        cartItem._id === action.payload.id
          ? { ...cartItem, quantity: action.payload.newValue }
          : cartItem
      );
      return { ...state, cartItems: updatedObjectArray };
    case CALCULATE_TOTAL:
      let usdTotal = 0;
      let lkrTotal = 0;
      state.cartItems.forEach((cartItem) => {
        lkrTotal += cartItem.price.lkr * cartItem.quantity;
        usdTotal += cartItem.price.usd * cartItem.quantity;
      });
      state.total.lkr = lkrTotal.toFixed(2);
      state.total.usd = usdTotal.toFixed(2);
      return {
        ...state,
      };

    case CREATE_ORDER_NUMBER:
      const newOrderNumber = state.orderNumber + 1;
      return {
        ...state,
        orderNumber: newOrderNumber,
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case GET_STOCK_ITEMS:
      return {
        ...state,
        stockItems: action.payload.items,
        category: action.payload.category,
      };
    case UPDATE_STOCK_QUANTITY:
      if (action.status === "decrease") {
        const updatedStockObjectArray = state.stockItems.map((stockItem) =>
          stockItem._id === action.payload
            ? { ...stockItem, stockQuantity: stockItem.stockQuantity - 1 }
            : stockItem
        );
        return { ...state, stockItems: updatedStockObjectArray };
      } else {
        const updatedStockObjectArray = state.stockItems.map((stockItem) =>
          stockItem._id === action.payload
            ? { ...stockItem, stockQuantity: stockItem.stockQuantity + 1 }
            : stockItem
        );
        return { ...state, stockItems: updatedStockObjectArray };
      }
    case SAVE_iNVOICE_DATA:
      if (
        state.invoiceList.some(
          (invoiceItem) => invoiceItem.invoiceId === action.payload.invoiceId
        )
      ) {
        const newInvoiceList = state.invoiceList.filter(
          (invoiceItem) => invoiceItem.invoiceId !== action.payload.invoiceId
        );
        return {
          ...state,
          invoiceList: [...newInvoiceList, action.payload],
        };
      } else {
        return {
          ...state,
          invoiceList: [...state.invoiceList, action.payload],
        };
      }

    case LOAD_INVOICE_DATA:
      console.log(action.payload);
      return {
        ...state,
        orderNumber: action.payload.invoiceId,
        cartItems: action.payload.purchaseItems,
      };
    default:
      return state;
  }
};
export default cartReducer;
