// import ApiService from "../../services/ApiService";
// import { takeEvery, call, put } from "redux-saga/effects"
// import { AUTHME, CREATE_POST, DELETE_ACTIVITY, DELETE_ADMIN, DELETE_POST, DELETE_REPORT, EDIT_ACTIVITY, EDIT_ADMIN, EDIT_POST, EDIT_REPORT, LOGIN, LOGIN_STATE, POST_ACTIVITY, POST_ADMIN, REQUEST_ACTIVITIES, REQUEST_ADMINS, REQUEST_POSTS, REQUEST_REPORTS, SET_ACTIVITIES, SET_ACTIVITY, SET_ADMIN, SET_ADMINS, SET_CURRENT_ADMIN, SET_POST, SET_POSTS, SET_REPORT, SET_REPORTS, SHOW_ALERT } from "../types";

// export function* activitiSagaWatcher() {
//     yield takeEvery(REQUEST_ACTIVITIES, sagaWorker)
//     yield takeEvery(REQUEST_ADMINS, sagaRequestAdminsWorker)
//     yield takeEvery(REQUEST_POSTS, sagaRequestPosts)
//     yield takeEvery(REQUEST_REPORTS, sagaRequestReportsWorker)

//     yield takeEvery(POST_ADMIN, sagaPostAdminWorker)
//     yield takeEvery(POST_ACTIVITY, sagaCreateActivityWorker)
//     yield takeEvery(CREATE_POST, sagaCreatePost)

//     yield takeEvery(EDIT_REPORT, sagaEditReport)
//     yield takeEvery(EDIT_ACTIVITY, sagaEditActivity)
//     yield takeEvery(EDIT_POST, sagaEditPost)
//     yield takeEvery(EDIT_ADMIN, sagaEditAdmin)

//     yield takeEvery(DELETE_REPORT, sagaDeleteReportWorker)
//     yield takeEvery(DELETE_POST, sagaDeletePostWorker)
//     yield takeEvery(DELETE_ACTIVITY, sagaDeleteActivityWorker)
//     yield takeEvery(DELETE_ADMIN, sagaDeleteAdminWorker)

//     yield takeEvery(AUTHME, sagaAuthmeWorker)
//     yield takeEvery(LOGIN, sagaLoginWorker)
// }


// function* sagaEditAdmin({ payload }) {
//     try {
//         yield call(ApiService.Admin.Update, payload.id, payload.updates)
//         yield put({ type: SHOW_ALERT, payload: { type: "info", message: "Новость успешно обновлена" } })
//         yield put({ type: SET_CURRENT_ADMIN, payload: null })
//         // setTimeout(function* () {
//         yield put({ type: REQUEST_ADMINS })
//         // }, 300)
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при обнолвении обновления" } })
//     }
// }


// function* sagaEditPost({ payload }) {
//     try {
//         yield call(ApiService.Post.Update, payload.id, payload.updates)
//         yield put({ type: SHOW_ALERT, payload: { type: "info", message: "Новость успешно обновлена" } })
//         yield put({ type: SET_POST, payload: null })
//         // setTimeout(function* () {
//         yield put({ type: REQUEST_POSTS })
//         // }, 300)
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при обнолвении обновления" } })
//     }
// }

// function* sagaDeleteReportWorker({ payload }) {
//     try {
//         const _payload = yield call(ApiService.Report.Delete, payload)
//         yield put({ type: REQUEST_REPORTS })
//         yield put({ type: SHOW_ALERT, payload: { type: "info", message: "Завяка успешно удаленя" } })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при загрузке заявок" } })
//     }
// }
// function* sagaDeleteActivityWorker({ payload }) {
//     try {
//         const _payload = yield call(ApiService.Activity.DeleteActivity, payload)
//         yield put({ type: REQUEST_ACTIVITIES })
//         yield put({ type: SET_ACTIVITY, payload: null })
//         yield put({ type: SHOW_ALERT, payload: { type: "info", message: "Активность успешно удаленя" } })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при удалении активности" } })
//     }
// }
// function* sagaDeleteAdminWorker({ payload }) {
//     try {
//         const _payload = yield call(ApiService.Admin.Delete, payload)
//         yield put({ type: SET_CURRENT_ADMIN, payload: null })
//         yield put({ type: SHOW_ALERT, payload: { type: "info", message: "Администратор успешно удаленя" } })
//         yield put({ type: REQUEST_ADMINS })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при удалении администратора" } })
//     }
// }
// function* sagaDeletePostWorker({ payload }) {
//     try {
//         const _payload = yield call(ApiService.Post.Delete, payload)
//         yield put({ type: REQUEST_POSTS })
//         yield put({ type: SET_POST, payload: null })
//         yield put({ type: SHOW_ALERT, payload: { type: "info", message: "Пост успешно удаленя" } })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при удалении поста" } })
//     }
// }

// function* sagaEditActivity({ payload }) {
//     try {
//         yield call(ApiService.Activity.UpdateActivity, payload.id, payload.updates)
//         yield put({ type: SHOW_ALERT, payload: { type: "info", message: "Активность обновлена" } })
//         yield put({ type: SET_ACTIVITY, payload: null })
//         yield put({ type: REQUEST_ACTIVITIES })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при обновлении активности" } })
//     }
// }

// function* sagaEditReport({ payload }) {
//     try {
//         const { id, updates } = payload
//         yield call(ApiService.Report.Update, id, updates)

//         yield put({ type: SHOW_ALERT, payload: { type: "success", message: "Заявка успешно обновлена" } })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при обновлении заявки" } })
//     }
// }

// function* sagaAuthmeWorker() {
//     try {
//         const payload = yield call(ApiService.Auth.Me)
//         console.log(payload)
//         yield put({ type: SET_ADMIN, payload })
//         yield put({ type: LOGIN_STATE, payload: "authed" })
//     } catch {
//         yield put({ type: LOGIN_STATE, payload: "not authed" })
//     }
// }
// function* sagaWorker() {
//     try {
//         const payload = yield call(ApiService.Activity.GetActivities)
//         console.log(payload)
//         yield put({ type: SET_ACTIVITIES, payload })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при загрузке активностей" } })
//     }
// }
// function* sagaLoginWorker({ payload }) {
//     try {
//         const _payload = yield call(ApiService.Auth.Login, payload.login, payload.password)
//         yield put({ type: SET_ADMIN, payload: _payload })
//         yield put({ type: LOGIN_STATE, payload: "authed" })
//     } catch (error) {
//         yield put({ type: LOGIN_STATE, payload: "not authed" })
//     }
// }
// function* sagaCreateActivityWorker({ payload }) {
//     try {
//         yield call(ApiService.Activity.CreateActivity, payload)
//         yield put({ type: REQUEST_ACTIVITIES })
//         yield put({ type: SHOW_ALERT, payload: { type: "success", message: "Активность успешно создана" } })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при загрузке активностей" } })
//     }
// }
// function* sagaRequestAdminsWorker() {
//     try {
//         const payload = yield call(ApiService.Admin.Get)
//         yield put({ type: SET_ADMINS, payload })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при загрузке списка админов" } })
//         yield put({ type: SET_ADMINS, payload: [] })
//     }
// }
// function* sagaRequestPosts() {
//     try {
//         const payload = yield call(ApiService.Post.Get)
//         yield put({ type: SET_POSTS, payload })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при загрузке новстей" } })
//     }
// }
// function* sagaPostAdminWorker({ payload }) {
//     try {
//         yield call(ApiService.Admin.Create, JSON.stringify(payload))
//         yield put({ type: SHOW_ALERT, payload: { type: "success", message: "Админ успешно создан" } })
//         yield put({ type: REQUEST_ADMINS })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при создании админа" } })
//     }
// }
// function* sagaCreatePost({ payload }) {
//     try {
//         const _payload = yield call(ApiService.Post.Create, payload)
//         yield put({ type: REQUEST_POSTS })
//         yield put({ type: SHOW_ALERT, payload: { type: "success", message: "Новость успешно создана" } })

//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при создании админа" } })
//     }
// }
// function* sagaRequestReportsWorker() {
//     try {
//         const payload = yield call(ApiService.Report.Get)
//         yield put({ type: SET_REPORTS, payload })
//     } catch {
//         yield put({ type: SHOW_ALERT, payload: { type: "error", message: "Произошла ошибка при загрузке новостей" } })
//     }

// }