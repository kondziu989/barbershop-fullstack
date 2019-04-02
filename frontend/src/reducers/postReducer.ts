import { FETCH_POSTS, NEW_POST, FETCH_SERVICES } from '../actions/types'

const initialState ={
    items:[],
    item: {}
}

export default function(state = initialState, action : any) {
    switch(action.type){
        case FETCH_SERVICES:
            console.log('reducer')
            return{
                ...state,
                items:action.services
            }
        default:
            return state;
    }
}