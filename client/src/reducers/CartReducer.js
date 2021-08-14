import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/types";

const initialState = { products: [] };
export const CartReducers = (state = { cartItems: [] }, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ADD_ITEM:
      
      const item = payload;
      const existItem = state.cartItems.find((x) => 
        x.product === item.product
      );

      if(existItem){
        return { ...state, cartItems:state.cartItems.map(cart=>
            cart.product === existItem.product ? item : cart

        )     }; 
      } else{
        return { ...state, cartItems:[... state.cartItems,item ]}
      }

    case CART_REMOVE_ITEM:
        return { ...state, cartItems:state.cartItems.filter(cart=>
            cart.product !== payload 
            )     }; 

      default:
      return state;
  }
};
