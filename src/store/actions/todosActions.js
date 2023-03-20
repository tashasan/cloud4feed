import { create, getAll } from "../../services/apiServices/todosServices";
import ActionTypes from "./actionTypes";

const createAction = (id, createData) => {
    return async () => {
        await create(id, createData)
    };
};
const getAllAction = (id) => {
    return async (dispatch) => {
        await getAll(id)
            .then(async (res) => {
                let response = res.data;
                await dispatch(getAllReducer(response));
            })
    };
};
const getAllReducer = (data) => {
    return { type: ActionTypes.todos.GETALLBY_USERSID_TODOS_ACTION, payload: { data } };
};


const todosActions = {
    createAction,
    getAllAction
};
export default todosActions;