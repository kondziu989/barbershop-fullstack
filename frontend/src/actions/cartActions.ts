import {ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ITEM_FROM_CART} from './types';


export const addToCart = (id: number, price:number) =>({
        type: ADD_TO_CART,
        payload: {id, price}
})

export const removeFromCart = (id: number) =>({
        type: REMOVE_FROM_CART,
        payload: {id: id}
})

export const removeItemFromCart = (id: number) =>({
        type: REMOVE_ITEM_FROM_CART,
        payload: {id: id}
})