export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

login_user = (user) => {
    if (user !== null) {
        return {
            type: LOGIN,
            user: user
        }
    }
    return {type: LOGOUT}
}

export { login_user }