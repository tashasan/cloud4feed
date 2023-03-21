import { login, setLocalStorage } from '../../services/apiServices/authServices';
import ActionTypes from './actionTypes';

const loginAction = (loginData) => {
    return async (dispatch) => {
        await login(loginData)
            .then(async (res) => {
                setLocalStorage("token", res)
                return await dispatch(loginMessage(res));
            })
    };
};
const loginMessage = (token) => {
    return { type: ActionTypes.auth.LOGIN_ACTION, payload: { token } };
};

const authActions = {
    loginAction
};

export default authActions;