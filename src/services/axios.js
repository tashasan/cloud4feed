import axios from "axios";
const BASE_URL = "https://gorest.co.in/public/v2/";
const getToken = () => window.localStorage.getItem("token");
const getAuthorizationHeader = () => `Bearer ${getToken()}`;
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Authorization": `${getAuthorizationHeader()}`
};

export default axios.create({
    baseURL: BASE_URL,
    headers: headers,
    withCredentials: false,

});
