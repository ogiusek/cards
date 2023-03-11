import React from "react";
import style from "./Settings.module.css";

import { Link } from "react-router-dom";
import AuthContext from "../../other/AuthContext";

function Settings() {
    const ctx = React.useContext(AuthContext);

    return (<div className={style.settings}>
        <h1 style={{ color: 'white' }}>You're logged in as '{ctx.login}'</h1>
        <img className={style.avatar} src={ctx.user[3]} />
        <Link to={'/login'}>Login</Link>
        <Link to={'/register'}>Register</Link>
        <Link to={'/home'}>Home</Link>
    </div>);
}

export default Settings;