import { create, update, remove, getById, getAll, getPaginated } from "../../services/apiServices/usersServices";
import ActionTypes from "./actionTypes";

const createAction = (createData) => {
    return async () => {
        await create(createData)
    };
};
const updateAction = (updateData, id) => {
    return async () => {
        await update(updateData, id)
    };
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
                let response = res.data;
                const keys = ["id"];
                keys.map((e) => delete response[e]);
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
                window.localStorage.setItem("page", res.headers["x-pagination-total"]);
                let response = res.data;
                await dispatch(getAllReducer(response));
            })
    };
};
const getAllReducer = (data) => {
    return { type: ActionTypes.users.GETALL_USERS_ACTION, payload: { data } };
};
const getAllPaginateAction = (page, perPage) => {
    return async (dispatch) => {
        await getPaginated(page, perPage)
            .then(async (res) => {
                let response = res.data;
                await dispatch(getAllReducer(response));
            })
    };
};

const usersActions = {
    createAction,
    updateAction,
    removeAction,
    getByIdAction,
    getAllAction,
    getAllPaginateAction
};
export default usersActions;