import ActionTypes from "../actions/actionTypes";
import { initialState } from "./initialState";

const usersReducers = (state = initialState.users, action) => {

    switch (action.type) {
        case ActionTypes.users.GETBYID_USERS_ACTION:
            return {
                ...state,
                getById: action.payload.data,
            };
        case ActionTypes.users.GETALL_USERS_ACTION:
            return {
                ...state,
                getAll: action.payload.data
            };;
        default:
            return state;
    };
};

export default usersReducers;