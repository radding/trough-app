import { LOGIN, LOGOUT, SETTEAM } from "../actions";
import { cloneState } from "./utils";

let newState = {user: null, headers: null, team: {id: -1}};

const usersReducers = (state, action) => {
    switch (action.type) {
        case LOGIN:
            newState = cloneState(state);
            newState.user = action.user;
            newState.headers = action.user.headers;
            if (!action.after(newState.user)) {
                newState.user = null;
            }
            return newState;
        case LOGOUT:
            newState = cloneState(state);
            newState.user = null;
            newState.headers = null;            
            return newState;
        case SETTEAM:
            newState = cloneState(state);
            newState.team = action.team;
            return newState;            
        default:
            return state || newState;            
    }
}

export { usersReducers }