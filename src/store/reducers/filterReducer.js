import { SET_FILTERS } from "../types"

const initalState = {
    current: null,
    filters: []
}

export default (state = initalState, action) => {
    switch(action.type){
        case SET_FILTERS:
            return { ...state, filters: action.payload}
        default:
            return state
    }
}