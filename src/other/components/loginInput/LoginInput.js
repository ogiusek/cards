import React from "react";
import style from "./LoginInput.module.css";

function LoginInput({ label, value, setValue, hidden }) {
    return <div className={style.input}>
        <label htmlFor={label}>{label}</label>
        <input type={hidden ? 'password' : "text"} name={label}
            value={value} onChange={event => setValue(event.target.value)} />
    </div>
}

export default LoginInput;