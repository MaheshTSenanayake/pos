import { ADD_TO_CART, REMOVE_FROM_CART } from "../action/types";

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
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
