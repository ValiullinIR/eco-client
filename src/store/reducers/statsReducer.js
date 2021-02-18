import { STATS } from "../types"

const initalState = {
    stats: [],
    models: {},
    current: null
}

export default (state=initalState, action) => {
    switch(action.type){
        case STATS.SET:
            const sorted = action.payload.sort((a, b) => {
                if (a._id.year < b._id.year)
                    return 1
                else
                    return -1
                if (a._id.month < b._id.month)
                    return 1
                else
                    return -1
                if (a._id.day < b._id.day)
                    return 1
                else
                    return -1
                return 0
            }).reverse(0)
            console.log(sorted)
            return { ...state, stats: sorted }
        case STATS.SET_MODELS:
            return { ...state, models: action.payload }
        default:
            return state
    }
}