import React, { useState } from "react";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import { ButtonType, InputType } from "../utils/ComponentEnums";
import regexValidator from "../hooks/useRegexValidator";
import validationMessage from "../hooks/useValidationMessage";
import Button from "../components/Button/Button";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Actions from "../store/actions";
import { checkLogged } from "../hooks/useCheckLogged";
import open from "../assets/images/open.svg";
import closed from "../assets/images/closed.svg";

export default function Login() {
    let token = window.localStorage.getItem("token");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({});
    const [handleErrorMessage, setHandleErrorMessage] = useState(null);
    const [error, setError] = useState({});
    const [shown, setShown] = useState(false);

    const onChangeText = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setLoginData({ ...loginData, [id]: value });
        const validationResult = regexValidator(e.target.type, e.target.value);
        if (!validationResult && e.target.value !== "") {
            setError({ ...error, [e.target.id]: <span className="text-danger">{validationMessage(e.target.type)}</span> });
        }
        else { setError({ ...error, [e.target.id]: undefined }) }
    }
    const onFocus = (e) => {
        e.preventDefault();
        setHandleErrorMessage(null);
    };
    async function isLogged() {
        await dispatch(Actions.usersActions.getAllAction())
        navigate("/users");
    };
    const onLogin = async (e) => {
        e.preventDefault();
        if (Object.values(error).every((val) => val === undefined) && Object.values(loginData).length === 2) {
            await dispatch(Actions.authActions.loginAction(loginData))
            checkLogged() !== null ? isLogged() : setHandleErrorMessage(<span className="text-danger">Please check your token.</span>)
        }
        else {
            Object.values(error).every((val) => val !== undefined) ?
                setHandleErrorMessage(<span className="text-danger">Please fill the inputs correctly.</span>) :
                setHandleErrorMessage(<span className="text-danger">Please fill the inputs.</span>)
        }
    };
    const content = (
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="col-4"></div>
                <div className="col-4 mt-5">
                    <Card
                        body={<div className="container-fluid">
                            <div className="row">
                                <div className="col-11">
                                    <Input
                                        labelValue={{ text: "User Name", className: "fw-bold fs-6" }}
                                        id={"userName"}
                                        inputType={InputType.Text}
                                        placeholder={"User Name"}
                                        value={loginData.userName || ""}
                                        error={error.userName}
                                        onChange={onChangeText}
                                        onFocus={onFocus}
                                    />
                                </div>
                                <div className="col-1"></div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-11">
                                    <Input
                                        labelValue={{ text: "Token", className: "fw-bold fs-6" }}
                                        id={"token"}
                                        inputType={shown ? InputType.Text : InputType.Password}
                                        placeholder={"Token"}
                                        value={loginData.token || ""}
                                        error={error.token}
                                        onChange={onChangeText}
                                        onFocus={onFocus}
                                    />
                                </div>
                                <div className="col-1" style={{ paddingTop: "2.2rem" }}>
                                    <img role={"button"} style={{ width: "1rem" }} onClick={(e) => { shown ? setShown(false) : setShown(true) }} src={shown ? open : closed} alt='tableView' />
                                </div>
                            </div>
                            <div className="text-center mt-1">{handleErrorMessage}</div>
                            <div className="row mt-3">
                                <div className="col-3"></div>
                                <div className="col-5 ms-3">
                                    <Button
                                        text={"Login"}
                                        type={ButtonType.Success}
                                        onClick={onLogin}
                                        disabled={(Object.values(error).every((val) => val === undefined) && Object.values(loginData).length === 2 && Object.values(loginData).every((val) => val !== "")) ? false : true}
                                    />
                                </div>
                            </div>
                        </div>
                        }
                    />
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    );
    return (
        token !== null ? <Navigate to="/users" /> : content
    )
}
