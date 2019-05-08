import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  REMOVE_ITEM_FROM_CART,
  HANDLE_ORDER_MAKE_PENDING,
  HANDLE_ORDER_MAKE_SUCCESS,
  HANDLE_ORDER_MAKE_ERROR
} from "./types";
import { CartItem } from "../reducers/cartReducer";

export const addToCart = (id: number, price: number) => ({
  type: ADD_TO_CART,
  payload: { id, price }
});

export const removeFromCart = (id: number) => ({
  type: REMOVE_FROM_CART,
  payload: { id: id }
});

export const removeItemFromCart = (id: number) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: { id: id }
});

const query = (token: string, orderedProducts: Array<any>) => {
  console.log(orderedProducts);
  const products = orderedProducts.map(product =>{return{
      IdP: product.id,
      quantity: product.quantity
  }});

  const order ={
    orderProducts: [],
    comment:""
  }

  return JSON.stringify({
    query: `mutation {
                  makeOrder(
                        token: "${token}",
                        order: ${JSON.stringify(order)}
                  )
                }
                `
  });
};

export const handleMakeOrder = (token: string, orderedProducts: Array<CartItem>) => (
  dispatch: any
) => {
  dispatch({ type: HANDLE_ORDER_MAKE_PENDING });
  console.log(query(token, orderedProducts))
  fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
    method: "POST",
    headers: {
      //'Accept': 'application/json',
      "Content-Type": "application/json"
    },
    body: query(token, orderedProducts)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.data.makeOrder);
      if(data.data.makeOrder === true){
        dispatch({
          type: HANDLE_ORDER_MAKE_SUCCESS,
          payload: data.data.makeOrder
        });
      } else {
        dispatch({
          type: HANDLE_ORDER_MAKE_ERROR,
          payload: true
        });
      }
    })
    .catch(err => {
      dispatch({
        type: HANDLE_ORDER_MAKE_ERROR,
        payload: err
      });
    });
};
