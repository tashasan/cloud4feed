import axios from "./axios";

let axiosInterceptor = null;
function AxiosRequest() {
    axios.interceptors.request.use(
        (config) => {
            const token = window.localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
};
export const postRequest = async (URL, Data) => {
    if (!!axiosInterceptor || axiosInterceptor === 0) {
        axios.interceptors.response.eject(axiosInterceptor);
    }
    AxiosRequest();
    return await axios.post(URL, Data);
};
export const putRequest = async (URL, Data) => {
    if (!!axiosInterceptor || axiosInterceptor === 0) {
        axios.interceptors.response.eject(axiosInterceptor);
    }
    AxiosRequest();
    return await axios.put(URL, Data);
};
export const removeRequest = async (URL, Data) => {
    if (!!axiosInterceptor || axiosInterceptor === 0) {
        axios.interceptors.response.eject(axiosInterceptor);
    }
    AxiosRequest();
    return await axios.delete(URL, Data);
};
export const getRequest = async (URL) => {
    if (!!axiosInterceptor || axiosInterceptor === 0) {
        axios.interceptors.response.eject(axiosInterceptor);
    }
    AxiosRequest();
    return await axios.get(URL);
};