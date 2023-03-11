import React, { useEffect } from "react";
import style from "./Character.module.css";

import icons from "./icons";
import Icon from "./characterIcon/CharacterIcon";

function Character({ health, replace, avatar, poison, fire, defense }) {
    const avatarObject = (
        <div className="avatar" style={{ position: 'relative' }}>
            {fire.time > 0 && <Icon icon={icons.fire} up={replace}
                hoverText={<>Fire damage is <div>{fire.damage}</div> for <div>{fire.time}</div> turns</>} />}
            {poison.time > 0 && <Icon icon={icons.poison} up={replace}
                hoverText={<>Poison damage is <div>{poison.damage}</div> for <div>{poison.time}</div> turns</>} />}
            {defense.damage > 0 && <Icon icon={icons.defense} up={replace}
                hoverText={<>Defense is<div>{defense.damage}</div>for now</>} />}
            <div id={'explosion'} />
            <div className={style.explosion} />
            <img style={{ position: 'relative' }} src={avatar} />
        </div>
    );

    useEffect(() => {
        const element = document.querySelector('#explosion');
        element.classList.add(style.explosion);
        setTimeout(() => {
            element.classList.remove(style.explosion);
        }, 1500);
    }, [health])

    return (<div className={style.avatar}>
        {replace && avatarObject}
        <div className={style.healthBar}>
            <div className={style.health} key={"key"}
                style={{
                    "width": (Math.floor(health) / 1500) * 100 + '%',
                    "backgroundColor": `rgb(${155 + (Math.floor(health) / 1500) * 100}, 0, 0)`
                }} />
            <div className={style.healthText}>{Math.floor(health)}/1500</div>
        </div>
        {!replace && avatarObject}
    </div>
    );
}

export default Character;