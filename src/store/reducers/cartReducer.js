import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CHANGE_CURRENCY,
  CLEAR_CART,
  CREATE_NEW_INVOICE,
  CREATE_ORDER_NUMBER,
  GET_STOCK_ITEMS,
  LOAD_INVOICE_DATA,
  REMOVE_FROM_CART,
  SAVE_INVOICE_DATA,
  SET_AMOUNT_RECIEVE,
  UPDATE_QUANTITY,
} from "../action/types";

const initialState = {
  currency: "LKR",
  lastOderNumber: 1,
  orderNumber: 1,
  isNewOrder: false,
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
      const updatedStockItemsByClear = state.stockItems.map((stockItem) => {
        const correspondingCartItem = action.payload.find(
          (cartItem) => cartItem._id === stockItem._id
        );
        if (correspondingCartItem) {
          return {
            ...stockItem,
            stockQuantity:
              stockItem.stockQuantity + correspondingCartItem.quantity,
          };
        }
        return stockItem;
      });
      return {
        ...state,
        stockItems: updatedStockItemsByClear,
        currentInvoice: {
          ...state.currentInvoice,
          cartItems: [],
          total: { lkr: 0, usd: 0 },
        },
      };
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: action.payload,
      };
    case CREATE_ORDER_NUMBER:
      const newOderNumber = state.lastOderNumber + 1;
      if (
        state.invoiceList.some(
          (invoice) => invoice.invoiceId === state.lastOderNumber
        )
      ) {
        return {
          ...state,
          lastOderNumber: newOderNumber,
          isNewOrder: true,
        };
      } else {
        return {
          ...state,
          isNewOrder: true,
        };
      }

    case CREATE_NEW_INVOICE:
      return {
        ...state,
        isNewOrder: false,
        orderNumber: state.lastOderNumber,
        currentInvoice: {
          ...state.currentInvoice,
          cutomerId: action.payload.customerId,
          date: action.payload.date,
          invoiceId: action.payload.invoiceId,
          time: action.payload.time,
        },
      };
    case SAVE_INVOICE_DATA:
      const invoiceStatus = action.payload.invoiceStatus;
      let newInvoice = {};

      if (action.payload.invoiceStatus.payMethod === "Card") {
        const cardDetails = action.payload;
        delete cardDetails.invoiceStatus;
        console.log(cardDetails);
        newInvoice = {
          ...state.currentInvoice,
          cardDetails: cardDetails,
          invoiceStatus: invoiceStatus,
        };
      } else {
        newInvoice = {
          ...state.currentInvoice,
          invoiceStatus: invoiceStatus,
        };
      }

      if (
        state.invoiceList.some(
          (invoiceItem) =>
            invoiceItem.invoiceId === state.currentInvoice.invoiceId
        )
      ) {
        const newInvoiceList = state.invoiceList.filter(
          (invoiceItem) =>
            invoiceItem.invoiceId !== state.currentInvoice.invoiceId
        );
        return {
          ...state,
          invoiceList: [...newInvoiceList, newInvoice],
        };
      } else {
        return {
          ...state,
          invoiceList: [...state.invoiceList, newInvoice],
          currentInvoice: {
            cartItems: [],
            total: { lkr: 0, usd: 0 },
          },
        };
      }
    case LOAD_INVOICE_DATA:
      return {
        ...state,
        currentInvoice: action.payload,
        orderNumber: action.payload.invoiceId,
        isNewOrder: false,
      };
    default:
      return state;
  }
};
export default cartReducer;
