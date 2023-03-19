import { create, getAll } from "../../services/apiServices/todosServices";
import ActionTypes from "./actionTypes";

const createAction = (createData) => {
    return async (dispatch) => {
        await create(createData)
            .then(async (res) => {
                if (res.data.code === 200) {
                    await dispatch(createReducer());
                }
            })
    };
};
const createReducer = () => {
    return { type: ActionTypes.todos.CREATE_TODOS_ACTION };
};
const getAllAction = () => {
    return async (dispatch) => {
        await getAll()
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