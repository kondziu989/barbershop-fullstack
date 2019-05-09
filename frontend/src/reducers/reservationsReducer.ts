import {
    FETCH_FREE_DAY_ERROR,
    FETCH_FREE_DAY_PENDING,
    FETCH_FREE_DAY_SUCCESS,
    FETCH_FREE_MONTH_ERROR,
    FETCH_FREE_MONTH_PENDING,
    FETCH_FREE_MONTH_SUCCESS,
    SET_RESERVATION_BARBER,
    SET_RESERVATION_SERVICE
} from "../actions/types";
  
  const initialStateMonth = {
    isPending: false,
    freeReservationsMonth: [],
    error: ""
  };
 
  const initialStateDay = {
    isPending: false,
    freeReservationsDay: [],
    error: ""
  };

  const initialReservationState ={
      barber: 1,
      service: 1,
  }

  export const reservationReducer = (
    state = initialReservationState,
    action: any = {}
  ) => {
    switch (action.type) {
      case SET_RESERVATION_SERVICE:
        return {
          ...state,
          service: action.payload
        };
      case SET_RESERVATION_BARBER:
        return {
          ...state,
          barber: action.payload
        };
      default:
        return state;
    }
  };
  
  export const freeMonthReducer = (state = initialStateMonth, action: any) => {
    switch (action.type) {
      case FETCH_FREE_MONTH_PENDING:
        return {
          ...state,
          isPending: true
        };
      case FETCH_FREE_MONTH_SUCCESS:
        return {
          ...state,
          isPending: false,
          freeReservationsMonth: action.payload
        };
      case FETCH_FREE_MONTH_ERROR:
        return {
          ...state,
          isPending: false,
          error: action.payload
        };
      default:
        return state;
    }
  }

export const freeDayReducer = (state = initialStateDay, action: any) => {
    switch (action.type) {
        case FETCH_FREE_DAY_PENDING:
        return {
            ...state,
            isPending: true
        };
        case FETCH_FREE_DAY_SUCCESS:
        return {
            ...state,
            isPending: false,
            freeReservationsDay: action.payload
        };
        case FETCH_FREE_DAY_ERROR:
        return {
            ...state,
            isPending: false,
            error: action.payload
        };
        default:
        return state;
    }
}
