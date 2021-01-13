import { combineReducers } from "redux"
// import { activityReducer } from "./activityReducer"
// import { adminReducer } from "./adminReducer"
// import { postsReducer } from "./postsReducer"
// import { reportsReducer } from "./reportsReducer"
// import { rootReducer } from "./rootReducer"
import filterReducer from "./filterReducer"
import recpointReducer from "./recpointReducer"

export const combinedReducers = combineReducers({
    filters: filterReducer,
    recpoints: recpointReducer
    // app: rootReducer,
    // activity: activityReducer,
    // posts: postsReducer,
    // admins: adminReducer,
    // reports: reportsReducer
})