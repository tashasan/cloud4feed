import { create, update, remove, getById, getAll } from "../../services/apiServices/usersServices";
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
    return { type: ActionTypes.users.CREATE_USERS_ACTION };
};
const updateAction = (updateData, id) => {
    return async (dispatch) => {
        await update(updateData, id)
            .then(async (res) => {
                await dispatch(updateReducer());
            })
    };
};
const updateReducer = () => {
    return { type: ActionTypes.users.UPDATE_USERS_ACTION };
};
const removeAction = (id) => {
    return async () => {
        await remove(id)
    };
};
const getByIdAction = (id) => {
    return async (dispatch) => {
        await getById(id)
            .then(async (res) => {
                let response = res.data.data;
                await dispatch(getByIdReducer(response));
            })
    };
};
const getByIdReducer = (data) => {
    return { type: ActionTypes.users.GETBYID_USERS_ACTION, payload: { data } };
};
const getAllAction = () => {
    return async (dispatch) => {
        await getAll()
            .then(async (res) => {
                let response = res.data.data;
                await dispatch(getAllReducer(response));
            })
    };
};
const getAllReducer = (data) => {
    return { type: ActionTypes.users.GETALL_USERS_ACTION, payload: { data } };
};


const usersActions = {
    createAction,
    updateAction,
    removeAction,
    getByIdAction,
    getAllAction
};
export default usersActions;