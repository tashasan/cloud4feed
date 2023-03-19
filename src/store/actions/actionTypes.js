const auth = {
    LOGIN_ACTION: "login_action"
}
const users = {
    CREATE_USERS_ACTION: "create_users_action",
    UPDATE_USERS_ACTION: "update_users_action",
    DELETE_USERS_ACTION: "delete_users_action",
    GETALL_USERS_ACTION: "getall_users_action",
    GETBYID_USERS_ACTION: "getbyid_users_action"
}
const todos = {
    CREATE_TODOS_ACTION: "create_todos_action",
    GETALLBY_USERSID_TODOS_ACTION: "getallby_userid_todos_action"
}
const ActionTypes = {
    auth,
    users,
    todos
};

export default ActionTypes;