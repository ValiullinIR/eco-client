import { takeEvery, call, put } from "redux-saga/effects"
import { REQUEST_FILTERS, SET_FILTERS, SET_FILTERS_LIST, RECPOINTS, POST_FILTER, MARKERS, USERS, EDIT_FILTER, SET_FILTER, DELETE_FILTER, PARTNERS, STATS } from "../types"
import ApiService from "../../services/ApiService"


export function* SagaWatcher() {
    yield takeEvery(REQUEST_FILTERS, requestFilterWatcher)
    yield takeEvery(RECPOINTS.REQUEST, requestRecPointsWatcher)
    yield takeEvery(MARKERS.REQUEST, requestMarkersWatcher)
    yield takeEvery(USERS.REQUEST, requestUsersWatcher)
    yield takeEvery(PARTNERS.REQUEST, requestPartnerWatcher)
    yield takeEvery(STATS.REQUEST, requestStatsWatcher)

    yield takeEvery(RECPOINTS.POST, postRecPointsWatcher)
    yield takeEvery(POST_FILTER, postFilterWatcher)
    yield takeEvery(MARKERS.POST, postMarkersWatcher)
    yield takeEvery(USERS.POST, postUserWathcer)
    yield takeEvery(PARTNERS.POST, postPartnerWathcer)

    yield takeEvery(RECPOINTS.EDIT, editRecPointsWatcher)
    yield takeEvery(EDIT_FILTER, editFilterWatcher)
    yield takeEvery(MARKERS.EDIT, editMarkersWatcher)
    yield takeEvery(USERS.EDIT, editUserWathcer)
    yield takeEvery(PARTNERS.EDIT, editPartnerWathcer)

    yield takeEvery(RECPOINTS.DELETE, deleteRecPointsWatcher)
    yield takeEvery(DELETE_FILTER, deleteFilterWatcher)
    yield takeEvery(MARKERS.DELETE, deleteMarkersWatcher)
    yield takeEvery(USERS.DELETE, deleteUserWathcer)
    yield takeEvery(PARTNERS.DELETE, deletePartnerWathcer)



    // add more details - update delete
}


// POST

function* postFilterWatcher({ payload }) {
    try {
        console.log(payload)
        yield call(ApiService.Filter.Create, payload)
        yield put({ type: REQUEST_FILTERS })
    } catch (error) {
        console.error(error)
    }
}
function* postRecPointsWatcher({ payload }) {
    try {
        console.log("payload rec", payload)
        yield call(ApiService.RecPoint.Create, payload)
        yield put({ type: RECPOINTS.REQUEST })
    } catch (error) {
        console.error(error)
    }
}

function* postMarkersWatcher({ payload }) {
    try {
        console.log("payload rec", payload)
        yield call(ApiService.Markers.Create, payload)
        yield put({ type: MARKERS.REQUEST })
    } catch (error) {
        console.error(error)
    }
}

function* postUserWathcer({ payload }) {
    try {
        yield call(ApiService.User.Create, payload)
        yield put({ type: USERS.REQUEST })
    } catch (error) {
        console.log(error)
    }
}

function* postPartnerWathcer({ payload }) {
    try {
        yield call(ApiService.Partner.Create, payload)
        yield put({ type: PARTNERS.REQUEST })
    } catch (error) {
        console.log(error)
    }
}


// EDIT


function* editFilterWatcher({ payload }) {
    try {
        console.log(payload)
        yield call(ApiService.Filter.Update, payload.id, payload.updates)
        yield put({ type: REQUEST_FILTERS })
    } catch (error) {
        console.error(error)
    }
}
function* editRecPointsWatcher({ payload }) {
    try {
        console.log("payload rec", payload)
        yield call(ApiService.RecPoint.Update, payload.id, payload.updates)
        yield put({ type: RECPOINTS.REQUEST })
    } catch (error) {
        console.error(error)
    }
}

function* editMarkersWatcher({ payload }) {
    try {
        console.log("payload rec", payload)
        yield call(ApiService.Markers.Update, payload.id, payload.updates)
        yield put({ type: MARKERS.REQUEST })
    } catch (error) {
        console.error(error)
    }
}

function* editUserWathcer({ payload }) {
    try {
        yield call(ApiService.User.Update, payload.id, payload.updates)
        yield put({ type: USERS.REQUEST })
    } catch (error) {
        console.log(error)
    }
}

function* editPartnerWathcer({ payload }) {
    try {
        yield call(ApiService.Partner.Update, payload.id, payload.updates)
        yield put({ type: PARTNERS.REQUEST })
    } catch (error) {
        console.log(error)
    }
}

// DELETE


function* deleteFilterWatcher({ payload }) {
    try {
        console.log(payload)
        yield call(ApiService.Filter.Delete, payload)
        yield put({ type: SET_FILTER, payload: null })
        yield put({ type: REQUEST_FILTERS })
    } catch (error) {
        console.error(error)
    }
}
function* deleteRecPointsWatcher({ payload }) {
    try {
        console.log("payload rec", payload)
        yield call(ApiService.RecPoint.Delete, payload)
        yield put({ type: RECPOINTS.SET_CURRENT, payload: null })
        yield put({ type: RECPOINTS.REQUEST })
    } catch (error) {
        console.error(error)
    }
}

function* deleteMarkersWatcher({ payload }) {
    try {
        console.log("payload rec", payload)
        yield call(ApiService.Markers.Delete, payload)
        yield put({ type: MARKERS.SET_CURRENT, payload: null })
        yield put({ type: MARKERS.REQUEST })
    } catch (error) {
        console.error(error)
    }
}

function* deleteUserWathcer({ payload }) {
    try {
        console.log(payload)
        yield call(ApiService.User.Delete, payload)
        yield put({ type: USERS.SET_CURRENT, payload: null })
        yield put({ type: USERS.REQUEST })
    } catch (error) {
        console.log(error)
    }
}

function* deletePartnerWathcer({ payload }) {
    try {
        console.log(payload)
        yield call(ApiService.Partner.Delete, payload)
        yield put({ type: PARTNERS.SET_CURRENT, payload: null })
        yield put({ type: PARTNERS.REQUEST })
    } catch (error) {
        console.log(error)
    }
}


// REQUEST


function* requestRecPointsWatcher() {
    try {
        const res = yield call(ApiService.RecPoint.Get)
        yield put({ type: RECPOINTS.SET, payload: res })
    } catch (error) {
        console.error(error)
    }
}

function* requestFilterWatcher({ payload }) {
    try {
        console.log("payload", payload);
        if (!payload) {
            const res = yield call(ApiService.Filter.Get)
            yield put({ type: SET_FILTERS, payload: res })
        } else {
            const res = yield call(ApiService.Markers.GetList)
            console.log(res);
            yield put({ type: SET_FILTERS_LIST, payload: res })
        }
    } catch (error) {
        console.error(error)
    }
}

function* requestMarkersWatcher() {
    try {
        const res = yield call(ApiService.Markers.Get)
        console.log("PL", typeof (res))
        yield put({ type: MARKERS.SET, payload: res })
    } catch (error) {
        console.error(error)
    }
}

function* requestUsersWatcher() {
    try {
        console.log("user get")
        const res = yield call(ApiService.User.Get)
        console.log(res)
        yield put({ type: USERS.SET, payload: res })
    } catch (error) {
        console.log(error)
    }
}

function* requestPartnerWatcher() {
    try {
        console.log("user get")
        const res = yield call(ApiService.Partner.Get)
        console.log(res)
        yield put({ type: PARTNERS.SET, payload: res })
    } catch (error) {
        console.log(error)
    }
}

function* requestStatsWatcher() {
    try {
        console.log("user get")
        const res = yield call(ApiService.Stats.Get)
        const res1 = yield call(ApiService.Stats.GetModels)
        console.log(res)
        yield put({ type: STATS.SET, payload: res })
        yield put({ type: STATS.SET_MODELS, payload: res1 })
    } catch (error) {
        console.log(error)
    }
}