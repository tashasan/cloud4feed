import { login, setLocalStorage } from '../../services/apiServices/authServices';
import ActionTypes from './actionTypes';

const loginAction = (loginData) => {
    return (dispatch) => {
        login(loginData)
            .then((res) => {
                if (!res) {
                    dispatch(loginMessage(res));
                    setLocalStorage("token", res)
                }

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