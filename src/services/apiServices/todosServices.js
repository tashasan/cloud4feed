import { getRequest, postRequest } from "../axiosRequest";
import endPoint from "./endPointAdressess";

export const create = async (createData) => {
    return await postRequest(endPoint.todos.CREATE_TODOS, createData)
};
export const getAll = async () => {
    return await getRequest(endPoint.todos.GETALLBY_USERSID_TODOS);
};