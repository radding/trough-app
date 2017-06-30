import * as Actions from "../actions";
import { bindActionCreators } from "redux";

function mapStateToProps(state) {
    return {
        user: state.usersReducers.user
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}

export { mapStateToProps, mapDispatchToProps };