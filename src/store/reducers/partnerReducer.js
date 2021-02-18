import { PARTNERS } from "../types"

const initalState = {
    partners: [],
    current: null
}

export default (state = initalState, action ) => {
    switch(action.type){
        case PARTNERS.SET:
            return { ...state, partners: action.payload}
        case PARTNERS.SET_CURRENT:
            return { ...state, current: action.payload}
        default:
            return state
    }
}