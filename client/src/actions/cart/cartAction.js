import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../types";

import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        qty: qty,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {
      console.log("error",error)
  }
};




export const removeFromCart = (id) => async (dispatch, getState) => {
    console.log("object id to remove ",id)
  try {
    dispatch({
      type: CART_REMOVE_ITEM,
      payload: id,
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (error) {}
};
