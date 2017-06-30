import { LOGIN, LOGOUT } from "../actions";
import { cloneState } from "./utils";

let newState = {user: null};

const usersReducers = (state, action) => {
    switch (action.type) {
        case LOGIN:
            newState = cloneState(state);
            newState.user = action.user;
            return newState;
        case LOGOUT:
            newState = cloneState(state);
            newState.user = null;
            return newState;
        default:
            return state || newState;            
    }
}

export { usersReducers }