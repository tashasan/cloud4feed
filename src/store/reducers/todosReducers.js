import ActionTypes from "../actions/actionTypes";
import { initialState } from "./initialState";

const todosReducers = (state = initialState.todos, action) => {

    switch (action.type) {
        case ActionTypes.todos.GETALLBY_USERSID_TODOS_ACTION:
            return {
                ...state,
                getAll: action.payload.data
            };;
        default:
            return state;
    };
};

export default todosReducers;