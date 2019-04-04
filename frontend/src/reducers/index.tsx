import { combineReducers } from 'redux'
import {servicesReducer} from "./servicesReducer"

export default combineReducers({
    services: servicesReducer
})