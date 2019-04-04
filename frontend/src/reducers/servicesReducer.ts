import {
  FETCH_SERVICES_PENDING,
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICES_ERROR
} from "../actions/types";

const initialStateServices = {
  isPending: false,
  services: [],
  error: ""
};

export const servicesReducer = (state = initialStateServices, action: any) => {
  switch (action.type) {
    case FETCH_SERVICES_PENDING:
      return {
        ...state,
        isPending: true
      };
    case FETCH_SERVICES_SUCCESS:
      return {
        ...state,
        isPending: false,
        services: action.payload
      };
    case FETCH_SERVICES_ERROR:
      return {
        ...state,
        isPending: false,
        error: action.payload
      };
    default:
      return state;
  }
}
