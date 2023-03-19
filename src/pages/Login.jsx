import React, { useState } from "react";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import { ButtonType, InputType } from "../utils/ComponentEnums";
import regexValidator from "../hooks/useRegexValidator";
import validationMessage from "../hooks/useValidationMessage";
import Button from "../components/Button/Button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Actions from "../store/actions";
import { checkLogged } from "../hooks/useCheckLogged";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({});
    const [handleErrorMessage, setHandleErrorMessage] = useState(null);
    const [error, setError] = useState({})

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

    }
    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center align-items-center mt-5">
                <div className="col-4"></div>
                <div className="col-4 mt-5">
                    <Card
                        body={<div className="container-fluid">
                            <div className="row">
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
                            <div className="row mt-3">
                                <Input
                                    labelValue={{ text: "Token", className: "fw-bold fs-6" }}
                                    id={"token"}
                                    inputType={InputType.Password}
                                    placeholder={"Token"}
                                    value={loginData.token || ""}
                                    error={error.token}
                                    onChange={onChangeText}
                                    onFocus={onFocus}
                                />
                            </div>
                            <div className="text-center mt-1">{handleErrorMessage}</div>
                            <div className="row mt-3">
                                <div className="col-3"></div>
                                <div className="col-5 ms-3">
                                    <Button
                                        text={"Login"}
                                        type={ButtonType.Success}
                                        onClick={onLogin}
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
    )
}
