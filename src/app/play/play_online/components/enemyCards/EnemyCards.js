import React from "react";
import style from "./EnemyCards.module.css";
import AuthContext from "../../../../../other/AuthContext";
import cardBack from "./cardBack";

function EnemyCards() {
    const ctx = React.useContext(AuthContext);
    const r = [1, 1, 1, 1, 1, 1, 1];
    return (
        <div className={style.cards}>
            {r.map((e, index) => {
                return <img className={style.card} key={index} src={cardBack} alt='' />;
            })}
        </div>
    );
}

export default EnemyCards;