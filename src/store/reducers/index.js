import { combineReducers } from "redux";
import authReducers from "./authReducers";
import usersReducers from "./usersReducers";
import todosReducers from "./todosReducers";

const reducers = combineReducers({
    auth: authReducers,
    users: usersReducers,
    todos: todosReducers
});

export default reducers;
