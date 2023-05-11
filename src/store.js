import { createStore } from "redux";
import cartReducer from "./store/reducers/cartReducer";

const store = createStore(cartReducer);

export default store;
