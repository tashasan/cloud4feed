import React, { useState } from "react";

export default function Login() {
    const [loginData, setLoginData] = useState({});

    const onChangeText = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setLoginData({ ...loginData, [id]: value });
    }

    const onLogin = (e) => {
        e.preventDefault();
    }
    return (
        <div className="container-fluid">Login</div>
    )
}
