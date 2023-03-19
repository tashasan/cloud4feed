export const getToken = () => window.localStorage.getItem("token")

export const initialState = {
    auth: {
        token: getToken()
    },
    users: {
        getAll: [],
        getById: []
    },
    todos: {
        getAll: [],
        getById: []
    }
};