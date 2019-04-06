import {HADLE_LOGIN_PENDING,HADLE_LOGIN_ERROR,HADLE_LOGIN_SUCCESS, OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG} from "../actions/types";

const initialLoginState = {
  isOpen: false,
  isPending: false,
  userData: {},
  error: ""
}

export const loginReducer = (state = initialLoginState, action: any) => {
    switch (action.type) {
      case OPEN_LOGIN_DIALOG:
        return{
          ...state,
          isOpen: action.payload
        };
      case CLOSE_LOGIN_DIALOG:
        return{
          ...state,
          isOpen: action.payload
        };
      case HADLE_LOGIN_PENDING:
        return {
          ...state,
          isPending: true
        };
      case HADLE_LOGIN_SUCCESS:
        return {
          ...state,
          isPending: false,
          userData: action.payload
        };
      case HADLE_LOGIN_ERROR:
        return {
          ...state,
          isPending: false,
          error: action.payload
        };
      default:
        return state;
    }
  }