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
  SET_AMOUNT_RECIEVE,
  UPDATE_QUANTITY,
} from "../action/types";

const initialState = {
  currency: "LKR",
  lastOderNumber: 0,
  orderNumber: 1,
  stockItems: [],
  category: [],
  currentInvoice: {
    cartItems: [],
    total: { lkr: 0, usd: 0 },
  },
  invoiceList: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCK_ITEMS:
      return {
        ...state,
        stockItems: action.payload.items,
        category: action.payload.category,
      };
    case CALCULATE_TOTAL:
      let usdTotal = 0;
      let lkrTotal = 0;
      state.currentInvoice.cartItems.forEach((cartItem) => {
        lkrTotal += cartItem.price.lkr * cartItem.quantity;
        usdTotal += cartItem.price.usd * cartItem.quantity;
      });
      return {
        ...state,
        currentInvoice: {
          ...state.currentInvoice,
          total: { lkr: lkrTotal.toFixed(2), usd: usdTotal.toFixed(2) },
        },
      };
    case ADD_TO_CART:
      const newItem = { ...action.payload, quantity: 1 };
      const newUpdatededStocItems = state.stockItems.map((stockItem) =>
        stockItem._id === action.payload._id
          ? { ...stockItem, stockQuantity: stockItem.stockQuantity - 1 }
          : stockItem
      );
      return {
        ...state,

        currentInvoice: {
          ...state.currentInvoice,
          cartItems:
            state.currentInvoice && state.currentInvoice.cartItems
              ? [...state.currentInvoice.cartItems, newItem]
              : [newItem],
        },
        stockItems: newUpdatededStocItems,
      };
    case REMOVE_FROM_CART:
      const removeQty = state.currentInvoice.cartItems.find(
        (item) => item._id === action.payload
      ).quantity;
      const updatededStocItems = state.stockItems.map((stockItem) =>
        stockItem._id === action.payload
          ? { ...stockItem, stockQuantity: stockItem.stockQuantity + removeQty }
          : stockItem
      );
      return {
        ...state,
        currentInvoice: {
          ...state.currentInvoice,
          cartItems: state.currentInvoice.cartItems.filter(
            (item) => item._id !== action.payload
          ),
        },
        stockItems: updatededStocItems,
      };
    case UPDATE_QUANTITY:
      const updatedCartItemstArray = state.currentInvoice.cartItems.map(
        (cartItem) =>
          cartItem._id === action.payload.id
            ? { ...cartItem, quantity: action.payload.newValue }
            : cartItem
      );

      const quantityChange =
        state.currentInvoice.cartItems.find(
          (item) => item._id === action.payload.id
        ).quantity - action.payload.newValue;
      const updatededStocItemsWithQuantityChange = state.stockItems.map(
        (stockItem) =>
          stockItem._id === action.payload.id
            ? {
                ...stockItem,
                stockQuantity: stockItem.stockQuantity + quantityChange,
              }
            : stockItem
      );
      return {
        ...state,
        currentInvoice: {
          ...state.currentInvoice,
          cartItems: updatedCartItemstArray,
        },
        stockItems: updatededStocItemsWithQuantityChange,
      };
    case SET_AMOUNT_RECIEVE:
      const balance =
        state.currency === "LKR"
          ? action.payload - state.currentInvoice.total.lkr
          : action.payload - state.currentInvoice.total.usd;
      return {
        ...state,
        currentInvoice: {
          ...state.currentInvoice,
          recieveAmount: action.payload,
          balance: balance,
        },
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
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
        total: action.payload.total,
        currency: action.payload.currency,
      };
    default:
      return state;
  }
};
export default cartReducer;
