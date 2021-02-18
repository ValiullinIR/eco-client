import { combineReducers } from "redux"
import filterReducer from "./filterReducer"
import recpointReducer from "./recpointReducer"
import markerReducer from "./markerReducer"
import userReducer from "./userReducer"
import partnerReducer from "./partnerReducer"
import statsReducer from "./statsReducer"

export const combinedReducers = combineReducers({
    filters: filterReducer,
    recpoints: recpointReducer,
    markers: markerReducer,
    users: userReducer,
    partners: partnerReducer,
    stats: statsReducer
})