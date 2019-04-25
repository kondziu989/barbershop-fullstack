import {
    FETCH_ORDERS_PENDING,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR
} from "../actions/types";
  
  const initialStateOrders = {
    isPending: false,
    orders: [],
    error: ""
  };
  
  export const ordersReducer = (state = initialStateOrders, action: any) => {
    switch (action.type) {
      case FETCH_ORDERS_PENDING:
        return {
          ...state,
          isPending: true
        };
      case FETCH_ORDERS_SUCCESS:
        return {
          ...state,
          isPending: false,
          orders: action.payload
        };
      case FETCH_ORDERS_ERROR:
        return {
          ...state,
          isPending: false,
          error: action.payload
        };
      default:
        return state;
    }
  }
  