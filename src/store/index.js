import {combineReducers, createStore} from "redux";
import postReducer from "./reducers/postReducer";

const rootReducer = combineReducers({
    post: postReducer
})

const store = createStore(rootReducer)
export default store