import { USERS } from "../types"
const initalState = {
    users: [],
    current: null
}

export default (state=initalState, action) => {
    switch(action.type){
        case USERS.SET:
            return { ...state, users: action.payload }
        case USERS.SET_CURRENT:
            return { ...state, current: action.payload }
        default:
            return state
    }
}