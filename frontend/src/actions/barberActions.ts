import {
  FETCH_BARBERS_ERROR,
  FETCH_BARBERS_PENDING,
  FETCH_BARBERS_SUCCESS
} from "../actions/types";
import { Dispatch } from "redux";

const query = `
{
    barbers{
      IdB,
      name
    }
}
`;

export const fetchBarbers = () => (dispatch: Dispatch) => {
  dispatch({ type: FETCH_BARBERS_PENDING });
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
        type: FETCH_BARBERS_SUCCESS,
        payload: data.data.barbers
      })
    )
    .catch((err: any) =>
      dispatch({
        type: FETCH_BARBERS_ERROR,
        payload: err
      })
    );
};
