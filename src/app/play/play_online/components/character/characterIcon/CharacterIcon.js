import React from "react"
import style from "./CharacterIcon.module.css";

function CharacterIcon({ icon, hoverText, up }) {
    return (<div className={style.icon} >
        <div className={style.iconHover} style={{ flexDirection: up && "column-reverse" }}>
            <img src={icon} />
            <div>
                <div className={style.iconText}>{hoverText}</div>
            </div>
        </div>
    </div>)
}

export default CharacterIcon;