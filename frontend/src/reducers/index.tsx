import { combineReducers } from 'redux'
import {servicesReducer} from "./servicesReducer";
import {loginReducer} from "./loginReducer";
import {registerReducer} from "./registerReducer";

export default combineReducers({
    services: servicesReducer,
    login: loginReducer,
    register: registerReducer
})