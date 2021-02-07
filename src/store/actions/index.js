import {
    REQUEST_FILTERS,
    CREATE_FILTER,
    POST_FILTER,
    EDIT_FILTER,
    SET_FILTER,
    SET_FILTERS,
    DELETE_FILTER,
    RECPOINTS,
    MARKERS
} from "../types"

export const requestFilters = (list = false) => ({
    type: REQUEST_FILTERS,
    payload: list
})

export const requestRecPoints = () => ({
    type: RECPOINTS.REQUEST
})

export const requestMarkers = () => ({
    type: MARKERS.REQUEST
})



export const postRecPoint = (rp) => ({
    type: RECPOINTS.POST,
    payload: rp
})

export const postFilter = (fl) => ({
    type: POST_FILTER,
    payload: fl
})

export const postMarker = (rp) => ({
    type: MARKERS.POST,
    payload: rp
})

