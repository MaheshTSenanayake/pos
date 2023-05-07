import {
  ADD_TO_CART,
  CALCULATE_TOTAL,
  CLEAR_CART,
  CREATE_ORDER_NUMBER,
  REMOVE_FROM_CART,
  UPDATE_QUANTITY,
} from "../action/types";

const initialState = {
  cartItems: [],
  orderNumber: 1,
  total: 0,
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
      state.total = 0;
      state.cartItems.map(
        (cartItem) =>
          (state.total = state.total + cartItem.price * cartItem.quantity)
      );
      return {
        ...state,
      };
    case CREATE_ORDER_NUMBER:
      const newOrderNumber = state.orderNumber + 1;
      return {
        ...state,
        orderNumber: newOrderNumber,
      };
    default:
      return state;
  }
};
export default cartReducer;
