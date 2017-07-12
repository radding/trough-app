export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SETTEAM = "set_team";

login_user = (user, after = (user) => {return true; }) => {
    if (user !== null) {
        return {
            type: LOGIN,
            user: user,
            after: after
        }
    }
    return {type: LOGOUT}
}

set_team = (team) => {
    return {
        type: SETTEAM,
        team: team
    }
}

export { login_user, set_team }