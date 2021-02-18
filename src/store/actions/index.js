import {
    REQUEST_FILTERS,
    CREATE_FILTER,
    POST_FILTER,
    EDIT_FILTER,
    SET_FILTER,
    SET_FILTERS,
    DELETE_FILTER,
    RECPOINTS,
    MARKERS,
    USERS,
    PARTNERS,
    STATS
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

export const requestUsers = () => ({
    type: USERS.REQUEST
})

export const requestPartners = () => ({
    type: PARTNERS.REQUEST
})
export const requestStats = () => ({
    type: STATS.REQUEST
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


export const postUser = (us) => ({
    type: USERS.POST,
    payload: us
})

export const postPartner = (us) => ({
    type: PARTNERS.POST,
    payload: us
})



export const updateRecPoint = (id, updates) => ({
    type: RECPOINTS.EDIT,
    payload: {id, updates}
})

export const updateFilter = (id, updates) => ({
    type: EDIT_FILTER,
    payload: {id, updates}
})

export const updateMarker = (id, updates) => ({
    type: MARKERS.EDIT,
    payload: {id, updates}
})


export const updateUser = (id, updates) => ({
    type: USERS.EDIT,
    payload: {id, updates}
})


export const updatePartner = (id, updates) => ({
    type: PARTNERS.EDIT,
    payload: {id, updates}
})



export const deleteRecPoint = (rp) => ({
    type: RECPOINTS.DELETE,
    payload: rp
})

export const deleteFilter = (fl) => ({
    type: DELETE_FILTER,
    payload: fl
})

export const deleteMarker = (rp) => ({
    type: MARKERS.DELETE,
    payload: rp
})


export const deleteUser = (id) => ({
    type: USERS.DELETE,
    payload: id
})

export const deletePartner = (id) => ({
    type: PARTNERS.DELETE,
    payload: id
})



export const setRecPoint = (data=null) => ({
    type: RECPOINTS.SET_CURRENT,
    payload: data
})

export const setFilter = (data=null) => ({
    type: SET_FILTER,
    payload: data
})

export const setMarker = (data=null) => ({
    type: MARKERS.SET_CURRENTT,
    payload: data
})


export const setUser = (data=null) => ({
    type: USERS.SET_CURRENT,
    payload: data
})

export const setPartner = (data=null) => ({
    type: PARTNERS.SET_CURRENT,
    payload: data
})

