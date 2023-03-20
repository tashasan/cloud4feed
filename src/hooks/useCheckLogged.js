export const checkLogged = () => {
    const getToken = () => window.localStorage.getItem("token");
    const token = getToken();
    return token === null ? null : token
};