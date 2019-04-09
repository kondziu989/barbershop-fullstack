import { OPEN_REGISTER_DIALOG, CLOSE_REGISTER_DIALOG } from "../actions/types";

const initialRegisterState = {
  isOpen: false
};

export const registerReducer = (
  state = initialRegisterState,
  action: any = {}
) => {
  switch (action.type) {
    case OPEN_REGISTER_DIALOG:
      return {
        ...state,
        isOpen: action.payload
      };
    case CLOSE_REGISTER_DIALOG:
      return {
        ...state,
        isOpen: action.payload
      };
    default:
      return state;
  }
};
