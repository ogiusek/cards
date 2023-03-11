import React, { useState } from "react";
import style from "./Register.module.css";

import { link, headers, checkResponse } from "../../other/api/api";
import { Link, useNavigate } from "react-router-dom";
import LoginInput from "../../other/components/loginInput/LoginInput";
import Hash from "../../other/Hash";
import AuthContext from "../../other/AuthContext";

function Register() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [cPassword, setCPassword] = useState('');
    const ctx = React.useContext(AuthContext);
    const navigate = useNavigate();

    const submit = () => {
        if (login.length < 5) {
            window.alert('To short login');
            return;
        }
        if (password.length < 8) {
            window.alert('To short password');
            return;
        }
        if (cPassword !== password) {
            window.alert('Passwords are not the same');
            return;
        }

        fetch(link + 'register/', {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                "login": login,
                "password": Hash(password)
            })
        }).then(checkResponse).then(result => {
            if (result.value === "error") {
                window.alert('Wrong data');
            } else if (result.value === 'exists') {
                window.alert('Account exists');
            } else {
                ctx.setLogin(login);
                localStorage.setItem('login', login);
                ctx.setPassword(password);
                localStorage.setItem('password', Hash(password));
                ctx.setUser(result.value);
                navigate('/home', { replace: true }, navigate);
            }
        })

    }

    return (<div className={style.register}>
        <Link to={'/settings'}>Back</Link>
        <Link to={'/home'}>Home</Link>
        <LoginInput label='Login' value={login} setValue={setLogin} />
        <LoginInput label='Password' value={password} setValue={setPassword} hidden={true} />
        <LoginInput label='Confirm Password' value={cPassword} setValue={setCPassword} hidden={true} />
        <button onClick={submit}>Submit</button>
    </div>);
}

export default Register;