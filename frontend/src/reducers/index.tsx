import { combineReducers } from 'redux'
import {servicesReducer} from "./servicesReducer";
import {loginReducer} from "./loginReducer";
import {registerReducer} from "./registerReducer";
import {productsReducer} from "./productsReducer";
import { barberReducer } from "./barberReducer";

export default combineReducers({
    services: servicesReducer,
    login: loginReducer,
    register: registerReducer,
    products: productsReducer,
    barbers: barberReducer
})
