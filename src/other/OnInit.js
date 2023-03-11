import React, { useEffect } from "react";
import AuthContext from "./AuthContext";

import { link, headers, checkResponse } from "../other/api/api";

function OnInit() {
    const ctx = React.useContext(AuthContext);
    const login = () => {
        fetch(link + 'login/', {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                'login': localStorage.getItem('login'),
                'password': Number(localStorage.getItem('password'))
            })
        }).then(checkResponse)
            .then(result => {
                if (!Array.isArray(result.value)) {
                    localStorage.removeItem('login');
                    localStorage.removeItem('password');
                    ctx.setLogin('');
                    ctx.setPassword('');
                } else {
                    ctx.setUser(result.value);
                }
            })
    }

    const register = () => {
        fetch(link + 'guest/create/', {
            method: "POST",
            headers: headers,
            body: JSON.stringify({})
        }).then(checkResponse).then(result => {
            localStorage.setItem('password', 0);
            localStorage.setItem('login', result.user);
            ctx.setLogin(result.user);
            login();
        });
    }

    useEffect(() => {
        fetch(link + 'cards/get').then(checkResponse).then(result => {
            if (result.value !== 'error') {
                ctx.setCards(result);
            }
        });

        if (ctx.login === '' || ctx.login === null || ctx.login === undefined) {
            register();
        } else {
            login();
        }
    }, []);
    return <React.Fragment />
}

export default OnInit;