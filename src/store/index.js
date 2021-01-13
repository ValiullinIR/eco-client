import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga"
import thunk from "redux-thunk"
import { combinedReducers } from "./reducers";


export const saga = createSagaMiddleware()
export const store = createStore(combinedReducers, compose(
    applyMiddleware(
        thunk, saga
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))