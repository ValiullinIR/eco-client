import { takeEvery, call, put } from "redux-saga/effects"
import { REQUEST_FILTERS, SET_FILTERS, SET_FILTERS_LIST, RECPOINTS, POST_FILTER, MARKERS } from "../types"
import ApiService from "../../services/ApiService"


export function* SagaWatcher() {
    yield takeEvery(REQUEST_FILTERS, requestFilterWatcher)
    yield takeEvery(RECPOINTS.REQUEST, requestRecPointsWatcher)
    yield takeEvery(MARKERS.REQUEST, requestMarkersWatcher)

    yield takeEvery(RECPOINTS.POST, postRecPointsWatcher)
    yield takeEvery(POST_FILTER, postFilterWatcher)
    yield takeEvery(MARKERS.POST, postMarkersWatcher)
}

function* postFilterWatcher ({ payload }) {
    try {
        console.log(payload)
        yield call(ApiService.Filter.Create, payload)
        yield put({ type: REQUEST_FILTERS })
    } catch (error) {
        console.error(error)
    }
}
function* postRecPointsWatcher ({ payload }) {
    try {
        console.log("payload rec", payload)
        yield call(ApiService.RecPoint.Create, payload)
        yield put({ type: RECPOINTS.REQUEST })
    } catch (error) {
        console.error(error)
    }
}

function* postMarkersWatcher ({ payload }) {
    try {
        console.log("payload rec", payload)
        yield call(ApiService.Markers.Create, payload)
        yield put({ type: MARKERS.REQUEST })
    } catch (error) {
        console.error(error)
    }
}
function* requestRecPointsWatcher () {
    try {
        const res = yield call(ApiService.RecPoint.Get)
        yield put({ type: RECPOINTS.SET, payload: res })
    } catch (error) {
        console.error(error)
    }
}

function* requestFilterWatcher ({payload}) {
    try {
        console.log("payload", payload);
        if(!payload) {
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

function* requestMarkersWatcher () {
    try {
        const res = yield call(ApiService.Markers.Get)
        console.log("PL", typeof(res))
        yield put({ type: MARKERS.SET, payload: res })
    } catch (error) {
        console.error(error)
    }
}