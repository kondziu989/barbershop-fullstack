import {
    FETCH_PRODUCTS_PENDING,
    FETCH_PRODUCTS_SUCCESS,
    FETCH_PRODUCTS_ERROR
  } from "./types";
  
  let query = `
  {
  products
    {
      IdP,
      name,
      category,
      brand,
      price,
      description
    }
  }
  `;
  export const fetchProducts = () => (dispatch: any) => {
    dispatch({ type: FETCH_PRODUCTS_PENDING });
    fetch("https://mohawkbarbershop.herokuapp.com/graphql", {
      method: "POST",
      headers: {
        //'Accept': 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query
      })
    })
      .then(res => res.json())
      .then(data =>
        dispatch({
          type: FETCH_PRODUCTS_SUCCESS,
          payload: data.data.products
        })
      )
      .catch((err: any) =>
        dispatch({
          type: FETCH_PRODUCTS_ERROR,
          payload: err
        })
      );
  };
  