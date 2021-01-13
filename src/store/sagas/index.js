import { takeEvery, call, put } from "redux-saga/effects"
import { REQUEST_FILTERS, SET_FILTERS, RECPOINTS, POST_FILTER } from "../types"
import ApiService from "../../services/ApiService"


export function* SagaWatcher() {
    yield takeEvery(REQUEST_FILTERS, requestFilterWatcher)
    yield takeEvery(RECPOINTS.REQUEST, requestRecPointsWatcher)

    yield takeEvery(RECPOINTS.POST, postRecPointsWatcher)
    yield takeEvery(POST_FILTER, postFilterWatcher)
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
function* requestRecPointsWatcher () {
    try {
        const res = yield call(ApiService.RecPoint.Get)
        yield put({ type: RECPOINTS.SET, payload: res })
    } catch (error) {
        console.error(error)
    }
}

function* requestFilterWatcher () {
    try {
        const res = yield call(ApiService.Filter.Get)
        yield put({ type: SET_FILTERS, payload: res })
    } catch (error) {
        console.error(error)
    }
}