import {
  FETCH_BARBERS_PENDING,
  FETCH_BARBERS_ERROR,
  FETCH_BARBERS_SUCCESS
} from "../actions/types";

const initialBarberState = {
  isPending: false,
  barbers: [],
  error: ""
};

export const barberReducer = (state = initialBarberState, action: any = {}) => {
  switch (action.type) {
    case FETCH_BARBERS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case FETCH_BARBERS_SUCCESS:
      return {
        ...state,
        isPending: false,
        barbers: action.payload
      };
    case FETCH_BARBERS_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    default:
      return state;
  }
};
