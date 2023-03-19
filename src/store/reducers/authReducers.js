import ActionTypes from "../actions/actionTypes";
import { initialState } from "./initialState";

const authReducer = (state = initialState.auth, action) => {
    switch (action.type) {
        case ActionTypes.auth.LOGIN_ACTION:
            return {
                ...state,
                token: action.payload.token
            };
        default:
            return state;
    };
};

export default authReducer;
