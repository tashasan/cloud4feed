import { removeRequest, getRequest, postRequest, putRequest } from "../axiosRequest";
import endPoint from "./endPointAdressess";

export const create = async (createData) => {
    return await postRequest(endPoint.users.CREATE_USERS, JSON.stringify(createData))
};
export const update = async (updateData, id) => {
    return await putRequest(`${endPoint.users.UPDATE_USERS}/${id}`, JSON.stringify(updateData));
};
export const remove = async (id) => {
    return await removeRequest(`${endPoint.users.REMOVE_USERS}/${id}`);
};
export const getById = async (id) => {
    return await getRequest(`${endPoint.users.GETBYID_USERS}/${id}`);
};
export const getAll = async () => {
    return await getRequest(endPoint.users.GETALL_USERS);
};
export const getPaginated = async (page, perPage) => {
    return await getRequest(`${endPoint.users.GETUSERS_PAGINATION}?page=${page}&per_page=${perPage}`);
};