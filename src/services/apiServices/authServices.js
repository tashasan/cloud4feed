export const login = async (loginData) => {
    let result = "";
    const token = "72dab1b0e3c5b0b3d6a78cd77099708113377581829cb17dc5b7f0950505522a";
    (loginData.userName === "" || undefined || null) ? result = false
        : loginData.token === token ? result = true : result = false
    return result ? token : result
};
export function setLocalStorage(key, value) {
    window.localStorage.setItem(key, value);
};