import {
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR
} from "./types";
  



const query = (token: string, status:string) => {
    return JSON.stringify({
      query: `{
        orders(token: "${token}", status: "${status}"){
            IdO,
            status,
            comment,
            totalPrice,
            orderDate,
            orderProducts{
            name,
            category,
            brand,
            price,
            quantity
            }
        }
      }`
    });
  };
  
  
  export const fetchOrders = (token:string, status:string) => (dispatch: any) => {
    dispatch({ type: FETCH_ORDERS_PENDING });
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: query(token, status)
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: FETCH_ORDERS_SUCCESS,
          payload: data.data.orders
        })
      )
      .catch((err: any) =>
        dispatch({
          type: FETCH_ORDERS_ERROR,
          payload: err
        })
      );
  };