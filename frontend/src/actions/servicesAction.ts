import {
  FETCH_SERVICES_PENDING,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_ERROR
} from "./types";

let query = `
{
services
  {
  	ids,
    name,
    price,
    duration
  }
}
`;
export const fetchServices = () => (dispatch: any) => {
  dispatch({ type: FETCH_SERVICES_PENDING });
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
        type: FETCH_SERVICES_SUCCESS,
        payload: data.data.services
      })
    )
    .catch((err: any) =>
      dispatch({
        type: FETCH_SERVICES_ERROR,
        payload: err
      })
    );
};
