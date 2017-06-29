import { createStore, combineReducers } from "redux";
import { usersReducers } from "./reducers";

let store = createStore(combineReducers({usersReducers}));

export default store;