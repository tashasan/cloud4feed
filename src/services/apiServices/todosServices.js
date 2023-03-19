import { getRequest, postRequest } from "../axiosRequest";
import endPoint from "./endPointAdressess";

export const create = async (id, createData) => {
    return await postRequest(`${endPoint.todos.CREATE_TODOS}/${id}/todos`, createData)
};
export const getAll = async (id) => {
    return await getRequest(`${endPoint.todos.GETALLBY_USERSID_TODOS}/${id}/todos`);
};