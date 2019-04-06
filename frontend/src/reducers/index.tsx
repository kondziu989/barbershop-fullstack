import { combineReducers } from 'redux'
import {servicesReducer} from "./servicesReducer";
import {loginReducer} from "./loginReducer";

export default combineReducers({
    services: servicesReducer,
    login: loginReducer
})