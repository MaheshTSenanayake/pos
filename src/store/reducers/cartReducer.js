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
  SAVE_PAYMENT_DATA,
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
    //Get stock data and category from backend
    case GET_STOCK_ITEMS:
      return {
        ...state,
        stockItems: action.payload.items,
        category: action.payload.category,
      };
    // Calculate total amount of current invoice items
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
    //Add item from stock to item list of current invoice
    case ADD_TO_CART:
      const newItem = { ...action.payload, quantity: 1 };
      //Update Stock quantity
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
      //Remove item from curruent invoice item list
      const removeQty = state.currentInvoice.cartItems.find(
        (item) => item._id === action.payload
      ).quantity;
      //Update stock quantity after remove item from current invoice item list
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
      //Update current invoice item list
      const updatedCartItemstArray = state.currentInvoice.cartItems.map(
        (cartItem) =>
          cartItem._id === action.payload.id
            ? { ...cartItem, quantity: action.payload.newValue }
            : cartItem
      );
      //Calculate quantity cahange after ccart item quantity change
      const quantityChange =
        state.currentInvoice.cartItems.find(
          (item) => item._id === action.payload.id
        ).quantity - action.payload.newValue;
      //Update stock item stock quantity with change current invoice item quantity change
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
      //Return the quantity items to stock after clear cart
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
      //Change currency
      return {
        ...state,
        currency: action.payload,
      };
    case CREATE_ORDER_NUMBER:
      //Create new oder number for new order
      const newOderNumber = state.lastOderNumber + 1;
      if (
        //Check last order number is in the Invoice list.If that invoice is in the invoice list then create new order number
        state.invoiceList.some(
          (invoice) => invoice.invoiceId === state.lastOderNumber
        )
      ) {
        return {
          ...state,
          lastOderNumber: newOderNumber,
          isNewOrder: true,
          currentInvoice: {
            cartItems: [],
            total: { lkr: 0, usd: 0 },
          },
        };
      } else {
        return {
          ...state,
          isNewOrder: true,
          currentInvoice: {
            cartItems: [],
            total: { lkr: 0, usd: 0 },
          },
        };
      }

    case CREATE_NEW_INVOICE:
      //Set new values for current invoice
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
    //SAve payment data to current invoice
    case SAVE_PAYMENT_DATA:
      const invoiceStatus = action.payload.invoiceStatus;

      if (action.payload.invoiceStatus.payMethod === "Card") {
        const cardDetails = action.payload;
        delete cardDetails.invoiceStatus;
        return {
          ...state,
          currentInvoice: {
            ...state.currentInvoice,
            cardDetails: cardDetails,
            invoiceStatus: invoiceStatus,
            recieveAmount:
              state.currency === "LKR"
                ? state.currentInvoice.total.lkr
                : state.currentInvoice.total.usd,
          },
        };
      } else if (action.payload.invoiceStatus.payMethod === "Multiple") {
        let totalReceive = 0;
        action.payload.multiplePyamentList.map(
          (payment) => (totalReceive = totalReceive + parseInt(payment.amount))
        );
        let balance =
          totalReceive - state.currency === "LKR"
            ? state.currentInvoice.total.lkr
            : state.currentInvoice.total.usd;
        return {
          ...state,
          currentInvoice: {
            ...state.currentInvoice,
            multiplePyamentList: action.payload.multiplePyamentList,
            invoiceStatus: invoiceStatus,
            recieveAmount: totalReceive,
            balance: balance,
          },
        };
      } else if (action.payload.invoiceStatus.payMethod === "Cash") {
        let invoiceStatus = action.payload.invoiceStatus;
        let cashDetails = action.payload;
        delete cashDetails.invoiceStatus;
        let balance =
          action.payload.amountRecieve - state.currency === "LKR"
            ? state.currentInvoice.total.lkr
            : state.currentInvoice.total.usd;
        return {
          ...state,
          currentInvoice: {
            ...state.currentInvoice,
            cashDetails: cashDetails,
            invoiceStatus: invoiceStatus,
            recieveAmount: action.payload.amountRecieve,
            balance: balance,
          },
        };
      } else {
        return {
          ...state,
          currentInvoice: {
            ...state.currentInvoice,
            invoiceStatus: invoiceStatus,
          },
        };
      }

    //Update invoice list
    case SAVE_INVOICE_DATA:
      let updatedInvoice = {
        ...state.currentInvoice,
        invoiceStatus: action.payload.invoiceStatus,
      };
      //Check that invoice is updated one or new one
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
          invoiceList: [...newInvoiceList, updatedInvoice],
        };
      } else {
        return {
          ...state,
          invoiceList: [...state.invoiceList, updatedInvoice],
          currentInvoice: {
            cartItems: [],
            total: { lkr: 0, usd: 0 },
          },
        };
      }
    case LOAD_INVOICE_DATA:
      //Set invoice data for current invoice
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
