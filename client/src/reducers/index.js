import { combineReducers } from "redux";
import alertssReducer3 from "./AlertssReducers3";
import auth from "./auth";
import profile from "./ProfileReducer";
import roomReducer from "./roomReducer";
import { ProductDetailsReducers, ProductListReducers } from "./ProductReducers";
import { CartReducers } from "./CartReducer";

const rootReducer = combineReducers({
  alertssReducer3,
  auth,
  profile,
  roomReducer,
  productList: ProductListReducers,
  productDetails: ProductDetailsReducers,
  cart: CartReducers,
});

export default rootReducer;
