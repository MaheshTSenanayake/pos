import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CHANGE_CURRENCY,
  CLEAR_CART,
  CREATE_ORDER_NUMBER,
  GET_STOCK_ITEMS,
  REMOVE_FROM_CART,
  SAVE_iNVOICE_DATA,
  UPDATE_QUANTITY,
} from "../action/types";

const initialState = {
  stockItems: [],
  cartItems: [],
  orderNumber: 1,
  total: { lkr: 0, usd: 0 },
  currency: "LKR",
  invoiceList: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      return {
        ...state,
        cartItems: [...state.cartItems, newItem],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item._id !== action.payload
        ),
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
        stockItems: action.payload,
      };
    case SAVE_iNVOICE_DATA:
      console.log(action.payload);
      return {
        ...state,
        invoiceList: [...state.invoiceList, action.payload],
      };
    default:
      return state;
  }
};
export default cartReducer;
