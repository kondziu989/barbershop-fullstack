import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR
  } from "../actions/types";
  
  const initialStateProducts = {
    isPending: false,
    products: [],
    error: ""
  };
  
  export const productsReducer = (state = initialStateProducts, action: any) => {
    switch (action.type) {
      case FETCH_PRODUCTS_PENDING:
        return {
          ...state,
          isPending: true
        };
      case FETCH_PRODUCTS_SUCCESS:
        return {
          ...state,
          isPending: false,
          products: action.payload
        };
      case FETCH_PRODUCTS_ERROR:
        return {
          ...state,
          isPending: false,
          error: action.payload
        };
      default:
        return state;
    }
  }
  