import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ITEM_FROM_CART } from "../actions/types";
import { number } from "prop-types";


export interface CartItem{
    id: number,
    quantity: number,
    price: number
}
interface Product{
    IdP: number,
    name: string,
    category: string,
    brand: string,
    price: number,
    description: string
  }

const initialCartState = {
    products:[] as Array<Product>,
    cart: [] as Array<CartItem>,
    total: 0,
  };

export const cartReducer = (
  state = initialCartState,
  action: any = {}
) => {
    
  switch (action.type) {
    case ADD_TO_CART:
        var existedItem = state.cart.find(item => item.id === action.payload.id)
        console.log(existedItem)
      if (existedItem){
        console.log("Added to existing ID: " + existedItem.id)

        existedItem.quantity++
        return {
            ...state,
            total: state.total + action.payload.price
        }
      } else {
        console.log("Added new ID: " + action.payload.id)
        return{
            ...state,
          cart: [...state.cart, {id:action.payload.id, quantity:1, price:action.payload.price} as CartItem],
          total: state.total+action.payload.price
        };
    }
        
    case REMOVE_FROM_CART:
      var item = state.cart.find(item => item.id === action.payload.id)
      if(item && item.quantity>0){
        item.quantity--
        return {
          ...state,
          total: state.total - item.price
        }
      }
    else return state

    case REMOVE_ITEM_FROM_CART:
    console.log("REMOVE")
    var item = state.cart.find(item => item.id === action.payload.id)
      return item?{
        ...state,
        cart: state.cart.filter((i)=>i.id!==action.payload.id),
        total: state.total - (item.price * item.quantity)
      }:state

    default:
      return state;
  }
};