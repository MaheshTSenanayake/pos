import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/types";

const initialState = {
  items: [],
  orderNumber: 1,
  total: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const newTotal = state.total + newItem.price * newItem.quantity;
      return {
        ...state,
        items: [...state.items, newItem],
        total: newTotal,
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default cartReducer;
