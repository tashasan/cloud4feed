import axios from "./axios";

export const postRequest = async (URL, Data) => {
    return await axios.post(URL, Data)
};
export const putRequest = async (URL, Data) => {
    return await axios.put(URL, Data);
};
export const removeRequest = async (URL, Data) => {
    return await axios.delete(URL, Data);
};
export const getRequest = async (URL) => {
    return await axios.get(URL);
};