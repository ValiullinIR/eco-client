import { RECPOINTS } from "../types"

const initalState = {
    current: null,
    recpoints: []
}

export default (state = initalState, action) => {
    switch(action.type){
        case RECPOINTS.SET:
            return { ...state, recpoints: action.payload}
        default:
            return state
    }
}