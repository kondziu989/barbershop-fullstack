import {HADLE_LOGIN_PENDING,HADLE_LOGIN_ERROR,HADLE_LOGIN_SUCCESS, OPEN_LOGIN_DIALOG, CLOSE_LOGIN_DIALOG, HANDLE_LOGOUT} from "../actions/types";

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
          isOpen: action.payload,
          error: ""
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
          userData: (action.payload != null)? action.payload : {}
        };
      case HADLE_LOGIN_ERROR:
        return {
          ...state,
          isPending: false,
          error: action.payload
        };
      case HANDLE_LOGOUT:
        return initialLoginState;
      default:
        return state;
    }
  }