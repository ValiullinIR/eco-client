import {
    REQUEST_FILTERS,
    CREATE_FILTER,
    POST_FILTER,
    EDIT_FILTER,
    SET_FILTER,
    SET_FILTERS,
    DELETE_FILTER,
    RECPOINTS
} from "../types"

export const requestFilters = () => ({
    type: REQUEST_FILTERS
})

export const requestRecPoints = () => ({
    type: RECPOINTS.REQUEST
})

export const postRecPoint = (rp) => ({
    type: RECPOINTS.POST,
    payload: rp
})
export const postFilter = (fl) => ({
    type: POST_FILTER,
    payload: fl
})