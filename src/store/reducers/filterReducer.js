import { SET_FILTERS, SET_FILTERS_LIST } from "../types"

const initalState = {
    current: null,
    filters: [],
    list: []
}

export default (state = initalState, action) => {
    switch(action.type){
        case SET_FILTERS:
            return { ...state, filters: action.payload}
        case SET_FILTERS_LIST:
            console.log(SET_FILTERS_LIST, action)      
            return { ...state, list: action.payload}
        default:
            return state
    }
}